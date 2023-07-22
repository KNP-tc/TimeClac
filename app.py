from flask import Flask, request, render_template
import math

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def calculate_time():
    message = ""
    if request.method == 'POST':
        hoursLeft = float(request.form['hours'])
        workHours = float(request.form['workHours'])

        days = math.floor(hoursLeft / workHours)
        hours = math.floor(hoursLeft % workHours)
        mins = math.floor(((hoursLeft % workHours) - hours) * 60)
        message = f"{days} days {hours} hours {mins} mins left"

    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)
