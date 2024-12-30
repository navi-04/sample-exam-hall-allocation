import json
import csv
import random
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/submit', methods=['POST'])
def submit_form():
    
    try:
        
        num_departments = int(request.form['numDepartments'])
        
        
        departments_str = request.form['departments']
        hall_numbers_str = request.form['hallNumbers']
        
        departments = json.loads(departments_str)
        hall_numbers = json.loads(hall_numbers_str)


        def generate_registration_numbers(departments):
            registration_numbers = []
            for obj in departments:
                prefix = f"927623b{obj['name']}"
                registration_numbers.extend([f"{prefix}{str(i).zfill(3)}" for i in range(1,int( obj['numStudents']) + 1)])
            return registration_numbers

        def is_valid(grid, row, col, dept_prefix, rows, cols):
            directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
            for dr, dc in directions:
                r, c = row + dr, col + dc
                if 0 <= r < rows and 0 <= c < cols and grid[r][c] and grid[r][c].startswith(dept_prefix):
                    return False
            return True

        def place_student(grid, registration_numbers, rows, cols):
            random.shuffle(registration_numbers)  # Add randomness to help with different configurations
            for student in registration_numbers:
                dept_prefix = student[:9]
                for row in range(rows):
                    for col in range(cols):
                        if grid[row][col] is None and is_valid(grid, row, col, dept_prefix, rows, cols):
                            grid[row][col] = student
                            return student
            return None

        def create_seating_arrangement(registration_numbers, rows=6, cols=6):
            grid = [[None for _ in range(cols)] for _ in range(rows)]
            remaining_students = registration_numbers[:]
            while remaining_students:
                student = place_student(grid, remaining_students, rows, cols)
                if student:
                    remaining_students.remove(student)
                else:
                    break  # No valid placement found, stop and return the current grid
            return grid, remaining_students

        def write_seating_to_csv(grid, hall_number):
            # allocation/src/assets/files/
            filename = f"allocation/src/assets/files/file/hall_{hall_number}.csv"
            with open(filename, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerows(grid)

        def allocate_halls(registration_numbers, rows=6, cols=6):
            remaining_students = registration_numbers[:]
            i = 0 
            while remaining_students:
                grid, remaining_students = create_seating_arrangement(remaining_students, rows, cols)
                write_seating_to_csv(grid, hall_numbers[i])
                i+=1

                
        registration_numbers = generate_registration_numbers(departments)

        allocate_halls(registration_numbers)
        

        return 'Form submitted successfully!', 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return 'Failed to submit form', 500


@app.route('/data', methods=['GET'])
def get_data():
    global num_departments, departments, hall_numbers
    return jsonify({
        'num_departments': num_departments,
        'departments': departments,
        'hall_numbers': hall_numbers
    })

if __name__ == '__main__':
    app.run(debug=True)
