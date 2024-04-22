
// Function to add a new row to the meal planner table
function addRow() {
    const table = document.querySelector("#mealPlanForm tbody");
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach(day => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = day;
        for (let i = 1; i <= 5; i++) {
            const cell = newRow.insertCell(i);
            const input = document.createElement("input");
            input.type = "text";
            cell.appendChild(input);
        }
    });
}

// Function to clear the meal planner
function clearPlanner() {
    const table = document.querySelector("#mealPlanForm tbody");
    table.innerHTML = '';
}

// Function to simulate print / download
function printPlanner() {
    alert("Printing/Downloading planner...");
}

// Function to generate the meal plan
function generateMealPlan() {
    const email = document.getElementById("email").value;
    
    // Validate email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const name = document.getElementById("name").value;
    const goal = document.getElementById("goal").value;

    // Generate the meal plan HTML
    let mealPlanHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Meal Plan</title>
            <style>
                #mealPlanDisplay {
                    font-family: 'Courier New', Courier, monospace;
                }
            </style>
        </head>
        <body>
            <h1>Meal Plan for ${name}</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Goal for the Week:</strong> ${goal}</p>
            <h2>Weekly Meal Planner</h2>
            <table id="mealPlanDisplay">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Snack</th>
                        <th>Lunch</th>
                        <th>Snack</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach(day => {
        mealPlanHtml += '<tr>';
        mealPlanHtml += `<td>${day}</td>`;
        for (let i = 1; i <= 5; i++) {
            const meal = document.querySelector(`#mealPlanForm tbody tr:nth-child(${days.indexOf(day) + 1}) td:nth-child(${i + 1}) input`).value;
            mealPlanHtml += `<td>${meal}</td>`;
        }
        mealPlanHtml += '</tr>';
    });

    mealPlanHtml += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    // Open a new window and write the meal plan HTML
    const newWindow = window.open();
    newWindow.document.write(mealPlanHtml);
    newWindow.document.close();
}