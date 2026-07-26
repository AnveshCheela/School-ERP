import grpc
from concurrent import futures
import time
import logging
import threading
import signal
import sys

import grading_pb2
import grading_pb2_grpc

logging.basicConfig(level=logging.INFO)

class GradingServiceServicer(grading_pb2_grpc.GradingServiceServicer):
    def __init__(self):
        # In-memory store
        # self.store[class_id][student_id] = {'name': name, 'marks': {subject: score}}
        self.store = {}
        self.lock = threading.Lock()
        
    def SubmitMarks(self, request, context):
        logging.info(f"Received SubmitMarks request for {request.student_id}, subject: {request.subject}")
        with self.lock:
            if request.class_id not in self.store:
                self.store[request.class_id] = {}
            if request.student_id not in self.store[request.class_id]:
                self.store[request.class_id][request.student_id] = {
                    'name': request.student_name,
                    'marks': {}
                }
            self.store[request.class_id][request.student_id]['marks'][request.subject] = request.score
            
            student_data = self.store[request.class_id][request.student_id]
            total_score = sum(student_data['marks'].values())
            num_subjects = len(student_data['marks'])
            average = total_score / num_subjects if num_subjects > 0 else 0.0

        return grading_pb2.MarksResponse(
            student_id=request.student_id,
            subject=request.subject,
            score=request.score,
            average=average,
            message="Marks submitted successfully"
        )
        
    def StreamClassRankings(self, request, context):
        logging.info(f"Received StreamClassRankings request for class: {request.class_id}")
        students_list = []
        with self.lock:
            class_data = self.store.get(request.class_id, {})
            for student_id, data in class_data.items():
                marks = data['marks']
                num_subjects = len(marks)
                if num_subjects > 0:
                    average = sum(marks.values()) / num_subjects
                else:
                    average = 0.0
                students_list.append({
                    'student_id': student_id,
                    'student_name': data['name'],
                    'average': average,
                    'total_subjects': num_subjects
                })
                
        # Sort by average descending
        students_list.sort(key=lambda x: x['average'], reverse=True)
        
        # Yield RankingResponse
        for rank, student in enumerate(students_list, start=1):
            yield grading_pb2.RankingResponse(
                rank=rank,
                student_id=student['student_id'],
                student_name=student['student_name'],
                average=student['average'],
                total_subjects=student['total_subjects']
            )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    grading_pb2_grpc.add_GradingServiceServicer_to_server(GradingServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    logging.info("Grading Service started on port 50051")
    
    def handle_sigterm(*args):
        logging.info("Received shutdown signal, shutting down gracefully...")
        server.stop(3)
        sys.exit(0)
        
    signal.signal(signal.SIGTERM, handle_sigterm)
    signal.signal(signal.SIGINT, handle_sigterm)
    
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
