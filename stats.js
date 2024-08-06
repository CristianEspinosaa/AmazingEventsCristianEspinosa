let URL = 'https://aulamindhub.github.io/amazing-api/events.json'
import {getMaxAttendancePercentage, getMinAttendancePercentage, findEventWhitLargeCapacity} from './modules.js'
fetch(URL)
.then(response => response.json())
.then(data => {


    let assisHigh = document.getElementById('assisHigh')
    getMaxAttendancePercentage(data.events, assisHigh)
    
    let assisLow = document.getElementById('assisLow')
    getMinAttendancePercentage(data.events, assisLow)

    let eventLarg = document.getElementById('eventLarg')
    findEventWhitLargeCapacity(data, eventLarg)

    console.log(data.currentDate);
    
    
    let categoriasUpComming = data.events.filter(e => e.date > data.currentDate)
    let categoriasPassEvents = data.events.filter(e => e.date < data.currentDate)
    console.log(categoriasUpComming);
    console.log(categoriasPassEvents);
    
    
    
    const categoriesUp = {};

    categoriasUpComming.forEach(event => {
        if (!categoriesUp[event.category]) {
            categoriesUp[event.category] = { totalEarnings: 0, totalCapacity: 0, totalEstimate: 0 };
        }
        categoriesUp[event.category].totalEarnings += event.price * event.estimate;
        categoriesUp[event.category].totalCapacity += event.capacity;
        categoriesUp[event.category].totalEstimate += event.estimate;
    });

    const upcomingEventsSection = document.querySelector("tbody");
    let insertPointUp = 4

    for (const category in categoriesUp) {
        
        const totalEarnings = categoriesUp[category].totalEarnings;
        const totalCapacity = categoriesUp[category].totalCapacity;
        const totalEstimate = categoriesUp[category].totalEstimate;
        const attendancePercentage = ((totalEstimate / totalCapacity) * 100).toFixed(2);

        const row = upcomingEventsSection.insertRow(insertPointUp++);
        row.insertCell(0).textContent = category;
        row.insertCell(1).textContent = `$${totalEarnings}`;
        row.insertCell(2).textContent = `${attendancePercentage}%`;
    }

    const categoriesPass = {};

    categoriasPassEvents.forEach(event => {
        if (!categoriesPass[event.category]) {
            categoriesPass[event.category] = { totalEarnings: 0, totalCapacity: 0, totalAssistance: 0 };
        }
        categoriesPass[event.category].totalEarnings += event.price * event.assistance;
        categoriesPass[event.category].totalCapacity += event.capacity;
        categoriesPass[event.category].totalAssistance += event.assistance;
    });

    const passEventsSection = document.querySelector("tbody");
    let insertPointPass = 12

    for (const category in categoriesPass) {
        
        const totalEarnings = categoriesPass[category].totalEarnings;
        const totalCapacity = categoriesPass[category].totalCapacity;
        const totalAssistance = categoriesPass[category].totalAssistance;
        const attendancePercentage = ((totalAssistance / totalCapacity) * 100).toFixed(2);

        const row = passEventsSection.insertRow(insertPointPass++);
        row.insertCell(0).textContent = category;
        row.insertCell(1).textContent = `$${totalEarnings}`;
        row.insertCell(2).textContent = `${attendancePercentage}%`;
    }
})