import {useState, useEffect} from 'react'
import axios from 'axios'

function DealersAPI() {
    const [dealers, setDealers] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getDealers = async () =>{
            const res = await axios.get('/api/dealer')
            setDealers(res.data)
        }

        getDealers()
    },[callback])
    return {
        dealers: [dealers, setDealers],
        callback: [callback, setCallback]
    }
}

export default DealersAPI
