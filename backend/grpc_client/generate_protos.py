import subprocess
import sys

subprocess.run([
    sys.executable, '-m', 'grpc_tools.protoc',
    '-I.', '--python_out=.', '--grpc_python_out=.',
    'grading.proto'
], check=True)
print("Proto files generated successfully!")
