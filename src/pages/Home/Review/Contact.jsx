import React from 'react';

const Contact = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to reach out to us!</p>
            
            <p><strong>Email:</strong> raihan@gmail.com</p>
            <p><strong>Phone:</strong> +88 01703671846</p>
            <p><strong>Address:</strong> 123 Main Street, City, Country</p>
            
            {/* <form style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label><br />
                    <input type="text" name="name" style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label><br />
                    <input type="email" name="email" style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Message:</label><br />
                    <textarea name="message" rows="4" style={{ width: '100%', padding: '8px' }}></textarea>
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Send</button>
            </form> */}
        </div>
    );
};

export default Contact;
