import grpc
from django.conf import settings

# Import generated protobuf modules
from . import grading_pb2, grading_pb2_grpc

def get_stub():
    channel = grpc.insecure_channel(settings.GRPC_HOST)
    return grading_pb2_grpc.GradingServiceStub(channel)

def submit_marks(student_id, student_name, class_id, subject, score):
    stub = get_stub()
    response = stub.SubmitMarks(grading_pb2.MarksRequest(
        student_id=student_id,
        student_name=student_name,
        class_id=str(class_id),
        subject=subject,
        score=score,
    ))
    return response

def get_class_rankings(class_id):
    stub = get_stub()
    responses = stub.StreamClassRankings(grading_pb2.ClassRequest(class_id=str(class_id)))
    return list(responses)
