import React, { useState, useEffect } from 'react';

const Booking = () => {
    const [tools, setTools] = useState([]);
    const [selectedTool, setSelectedTool] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5001/tools')
            .then(res => res.json())
            .then(data => setTools(data));
    }, []);

    const calculatePrice = () => {
        if (!selectedTool || !startDate || !endDate) return;
        
        const tool = tools.find(t => t._id === selectedTool);
        if (!tool) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = (end - start) / (1000 * 60 * 60 * 24) + 1; // Calculate rental days
        setTotalPrice(days * tool.pricePerDay);
    };

    const handleBooking = () => {
        fetch('http://localhost:5001/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toolId: selectedTool,
                userId: 'USER_ID_HERE', // Replace with actual logged-in user ID
                startDate,
                endDate,
                totalPrice,
            }),
        })
        .then(response => response.json())
        .then(data => alert(data.message));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Book a Tool</h1>
            
            <label>Choose Tool:</label>
            <select className="form-control mb-2" onChange={e => setSelectedTool(e.target.value)}>
                <option value="">Select a Tool</option>
                {tools.map(tool => (
                    <option key={tool._id} value={tool._id}>{tool.name} - ${tool.pricePerDay}/day</option>
                ))}
            </select>

            <label>Start Date:</label>
            <input type="date" className="form-control mb-2" onChange={e => setStartDate(e.target.value)} />

            <label>End Date:</label>
            <input type="date" className="form-control mb-2" onChange={e => setEndDate(e.target.value)} />

            <button className="btn btn-secondary mb-2" onClick={calculatePrice}>Calculate Price</button>
            
            {totalPrice > 0 && <h3 className="mt-3">Total Price: ${totalPrice}</h3>}

            <button className="btn btn-success mt-3" onClick={handleBooking}>Confirm Booking</button>
        </div>
    );
};

export default Booking;
