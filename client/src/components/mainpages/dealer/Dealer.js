import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Dealers() {
    const state = useContext(GlobalState)
    const [dealers] = state.dealersAPI.dealers
    const [dealer, setDealer] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.dealersAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createDealer = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/dealer/${id}`, {name: dealer}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/dealer', {name: dealer}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setDealer('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editDealer = async (id, name) =>{
        setID(id)
        setDealer(name)
        setOnEdit(true)
    }

    const deleteDealer = async id =>{
        try {
            const res = await axios.delete(`/api/dealer/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="dealers">
            <form onSubmit={createDealer}>
                <label htmlFor="dealer">Dealer</label>
                <input type="text" name="dealer" value={dealer} required
                onChange={e => setDealer(e.target.value)} />

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    dealers.map(dealer => (
                        <div className="row" key={dealer._id}>
                            <p>{dealer.name}</p>
                            <div>
                                <button onClick={() => editDealer(dealer._id, dealer.name)}>Edit</button>
                                <button onClick={() => deleteDealer(dealer._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dealers
