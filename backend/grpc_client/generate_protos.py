import subprocess
import sys

subprocess.run([
    sys.executable, '-m', 'grpc_tools.protoc',
    '-I.', '--python_out=.', '--grpc_python_out=.',
    'grading.proto'
], check=True)

# Patch the generated file to use relative imports
with open('grading_pb2_grpc.py', 'r') as f:
    content = f.read()
content = content.replace('import grading_pb2 as grading__pb2', 'from . import grading_pb2 as grading__pb2')
with open('grading_pb2_grpc.py', 'w') as f:
    f.write(content)

print("Proto files generated and patched successfully!")
