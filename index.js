// Your code here
// Create a single employee record from an array
// Create a single employee record from an array
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Process an array of arrays into an array of employee records
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}

// Add a time in event to an employee's record
function createTimeInEvent(employee, dateStamp) {
  // Parse the date stamp (format: "YYYY-MM-DD HHMM")
  const [date, time] = dateStamp.split(' ');
  
  // Create the time in event object
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(time, 10)
  };
  
  // Add to the employee's timeInEvents array
  employee.timeInEvents.push(timeInEvent);
  
  // Return the updated employee record
  return employee;
}

// Add a time out event to an employee's record
function createTimeOutEvent(employee, dateStamp) {
  // Parse the date stamp (format: "YYYY-MM-DD HHMM")
  const [date, time] = dateStamp.split(' ');
  
  // Create the time out event object
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(time, 10)
  };
  
  // Add to the employee's timeOutEvents array
  employee.timeOutEvents.push(timeOutEvent);
  
  // Return the updated employee record
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  // Find the time in event for the date
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  
  // Find the time out event for the date
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
  // Calculate hours worked (difference between time out and time in)
  // Time is in military format (HHMM), so we divide by 100 to get hours
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  // Calculate hours worked for the date
  const hoursWorked = hoursWorkedOnDate(employee, date);
  
  // Multiply hours worked by the employee's pay rate
  return hoursWorked * employee.payPerHour;
}

// Calculate all wages for an employee across all dates
function allWagesFor(employee) {
  // Get all dates with time in events
  const dates = employee.timeInEvents.map(event => event.date);
  
  // Calculate total wages across all dates
  const totalWages = dates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
  
  return totalWages;
}

// Calculate the total payroll for all employees
function calculatePayroll(employees) {
  // Calculate total wages for all employees
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}