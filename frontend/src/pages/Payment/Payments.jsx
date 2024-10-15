import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../components/NavbarComponent'; 
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './Payments.css';

const PaymentPage = () => {
    const [payments, setPayments] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [paymentData, setPaymentData] = useState({
        requestId: '',
        distance: '',
        transportationCharge: '',
        weight: '',
        additionalCharges: ''
        // chargingModel: ''
    });

    useEffect(() => {
        // Fetch existing payments
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if(name=="distance"){
            const charge= value*100;
            setPaymentData((prevData)=>
            ({
                ...prevData,
                distance:value,
                transportationCharge:charge
            })

        )
        }

        else{
            setPaymentData((prevData)=>({
                ...prevData,
                [name]:value
            }))
        }
        
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:8000/api/payments', paymentData);
    //         fetchPayments(); // Refresh the payments list
    //         setPaymentData({
    //             requestId: '',
    //             distance: '',
    //             transportationCharge: '',
    //             weight: '',
    //             additionalCharges: '',
    //             chargingModel: ''
    //         });
    //         setIsFormVisible(false); // Hide the form after submission
    //     } catch (error) {
    //         console.error('Error adding payment:', error);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert the necessary fields to integers before sending
        const dataToSubmit = {
            requestId: parseInt(paymentData.requestId), // Convert requestId to an integer
            distance: parseInt(paymentData.distance),   // Convert distance to an integer
            transportationCharge: parseInt(paymentData.transportationCharge), // Convert transportation charge to an integer
            weight: parseInt(paymentData.weight),       // Convert weight to an integer
            additionalCharges: parseInt(paymentData.additionalCharges), // Convert additional charges to an integer
            chargingModel: paymentData.chargingModel    // Leave chargingModel as is (string or another format)
        };
    
        try {
            await axios.post('http://localhost:8000/api/payments', dataToSubmit);
            fetchPayments(); // Refresh the payments list
            setPaymentData({
                requestId: '',
                distance: '',
                transportationCharge: '',
                weight: '',
                additionalCharges: '',
                chargingModel: ''
            });
            setIsFormVisible(false); // Hide the form after submission
        } catch (error) {
            console.error('Error adding payment:', error);
        }
    };
    
    return (
        <div className="user-home">
            <NavbarComponent />

            <div className="payment-container">
                <div className="add-payment-btn-wrapper">
                    <button className="add-payment-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
                        {isFormVisible ? 'Close Payment Form' : 'Add Payment'}
                    </button>
                </div>

                {/* Modal Popup */}
                {isFormVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content-payment">
                            <span className="close-modal" onClick={() => setIsFormVisible(false)}>&times;</span>
                            <form onSubmit={handleSubmit} className="payment-form">
                                <h3>Make a Payment</h3>
                                <div>
                                    <label>Request ID:</label>
                                    <input 
                                        type="text" 
                                        name="requestId"
                                        value={paymentData.requestId} 
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Distance (km):</label>
                                    <input 
                                        type="number" 
                                        name="distance"
                                        value={paymentData.distance}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Transportation Charge:</label>
                                    <input 
                                        type="number" 
                                        name="transportationCharge"
                                        value={paymentData.transportationCharge}
                                        onChange={handleInputChange}
        
                                        readOnly 
                                    />
                                </div>
                                <div>
                                    <label>Weight (kg):</label>
                                    <input 
                                        type="number" 
                                        name="weight"
                                        value={paymentData.weight}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Additional Charges:</label>
                                    <input 
                                        type="number" 
                                        name="additionalCharges"
                                        value={paymentData.additionalCharges}
                                        onChange={handleInputChange}
                                    />
                                </div>
                           
                                <button type="submit">Submit Amount</button>
                            </form>
                        </div>
                    </div>
                )}

                <h3>Payment Records</h3>
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Distance (km)</th>
                            <th>Transportation Charge</th>
                            <th>Weight (kg)</th>
                            <th>Additional Charges</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{payment.requestId}</td>
                                <td>{payment.distance}</td>
                                <td>{payment.transportationCharge}</td>
                                <td>{payment.weight}</td>
                                <td>{payment.additionalCharges}</td>
                                
                                <td>{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
};

export default PaymentPage;
