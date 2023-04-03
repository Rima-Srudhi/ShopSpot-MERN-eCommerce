import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
//import Dealers from '../Dealer/dealer'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [dealers] = state.dealersAPI.dealers

    const [dealer, setDealer] = state.productsAPI.dealer
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }
    const handleDealer = e => {
        setDealer(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="row">
                <select name="dealer" value={dealer} onChange={handleDealer} >
                    <option value=''>All Dealers</option>
                    {
                        dealers.map(dealer => (
                            <option value={"dealer=" + dealer._id} key={dealer._id}>
                                {dealer.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: High-Low</option>
                    <option value='sort=price'>Price: Low-High</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
