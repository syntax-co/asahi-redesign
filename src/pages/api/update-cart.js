



export default function handler(req, res) {
    if (req.method === 'POST') {
      
        const data = req.body;
    
        
            
        
        res.status(200).json({ success: true, message: 'Data received successfully' });
    } else {
      
      res.status(405).json({ error: 'Method not allowed' });
    }
}