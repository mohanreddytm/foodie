import React, {useState, useEffect } from 'react'
import Header from '../Header'
import { Hourglass } from 'react-loader-spinner'
import { IoLibraryOutline, IoSearchSharp } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'

import EveryItem from '../EveryItem';

import './index.css'

const statusOne = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
}

const MainItemsCont = () => {
    
      const navigate = useNavigate();
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState("");
    const [status, setStatus] = useState(statusOne.LOADING);
    const {category,subCategory} = useParams()

    const loadingView = () => {
        return <div className='loading-main-cont'>
            <Hourglass
            visible={true}
            height="40"
            width="40"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
            />
        </div>
          
    }



    useEffect(() => {
        const getItemsAll = async () => {
            setStatus(statusOne.LOADING)
            const response = await fetch(`https://forfoodie.onrender.com/products/${subCategory === "fruits" ? "" : subCategory.split(" ")[0]}`)

            const data = await response.json()
            
            if(response.ok) {
                setItems(data)
                setStatus(statusOne.SUCCESS)
            }
            else {
                setStatus(statusOne.FAILURE)
            }
        }

        getItemsAll()
    }, [])

    const onClickEachItem = async (item) => {
        window.location.href = `/items/fruits/${item}`;

    }

    const fruitsOne = () => {
        const citrusUrl = "https://img.freepik.com/free-vector/fresh-citrus-fruit-collection-white_1284-33360.jpg?t=st=1744969150~exp=1744972750~hmac=fdf475c95c30d2cdf38573ac3e2702af775e5d63b7ac6483444181fda7c00f5f&w=1380"

        const fruitsUrl = "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg?t=st=1744968297~exp=1744971897~hmac=8225435c8aaa93dce6d9d9299f7b1d0afa26c2964936b60c61a551d3b4a82440&w=1480"
        const fruitsSubCategory = [
            {img:citrusUrl, name:"Citrus"},
            {img :"https://img.freepik.com/free-vector/vector-ripe-yellow-orange-red-whole-sliced-mango-cubes-with-leaf-isolated-white-background_1284-45465.jpg?t=st=1744973264~exp=1744976864~hmac=c26d8d9addc6a7e3d33c859d8959a33a62aa6f16188142cdc5fbd747ce51c70d&w=1380", name:"Summer Fruits"},
            {img :"https://img.freepik.com/free-photo/wooden-basket-with-fresh-sweet-fruits-gray_114579-60806.jpg?t=st=1744969552~exp=1744973152~hmac=feedabb9f54ca6ccfa58cd969809a6365860132ef22f3fffca696e3068db6545&w=1480",name:"Seasonal Fruits"},
            {img :"https://img.freepik.com/free-photo/composition-with-tropical-fruits-wooden-surface_273443-2970.jpg?t=st=1744969694~exp=1744973294~hmac=57b195182ce1842a1607a80a5ea0a01d768507af504e5ce0886487ac34be360b&w=1480", name:"Exotic Fruits"},
            {img : "https://img.freepik.com/free-photo/top-view-kiwi-basket-with-green-apples-pears-white-background_141793-51555.jpg?t=st=1744969744~exp=1744973344~hmac=00f7bb90ce4db491af3c4db3a1eb8effbe7fa7683b3b29a775ab9ea7b01badea&w=1480",name:"Stone Fruits"},
            {img :"https://img.freepik.com/free-vector/berry-fruit-realistic-composition-with-cluster-different-berries-realistic-images-with-shadows-blank-background_1284-32287.jpg?t=st=1744969809~exp=1744973409~hmac=d04a6187264e2e836b0a1ccfdbb79c5888132008e68538b5e36f157105979089&w=996", name:"Berries"},
            {img :"https://img.freepik.com/free-photo/close-up-delicious-dragon-fruit-table_23-2148482299.jpg?t=st=1744973014~exp=1744976614~hmac=311212bef0cc51a50022b7d8985b1cc119be0d2438ef7d7cfd1a1a11139dc98d&w=1480", name:"Tropical Fruits"},
            {img :"https://img.freepik.com/free-vector/two-fresh-ripe-whole-pomegranates-with-quarter-part-strewn-seeds-appetizing-closeup-realistic-composition_1284-31756.jpg?t=st=1744969916~exp=1744973516~hmac=2a7e1c30e9be759f43f980db69dad2f92de03dc0c665e44f339c76622825b7f6&w=1480" ,name:"Pome Fruits"},
          ]
        return (
            <div className='main-items-bottom-left-cont'>
                <div className={`main-items-left-cont-item main-items-left-cont-item-main ${subCategory === 'fruits' && "selected-item-style"}`} onClick={() => onClickEachItem("fruits")}>
                    <img src={fruitsUrl} alt="Fruits" className='main-items-left-cont-item-img' />
                    <h1 className='main-items-left-cont-item-name'>Fruits</h1>
                </div>
                <ul className='main-items-left-cont'>
                    {fruitsSubCategory.map((item) => (
                        <li key={item.name} onClick={() => onClickEachItem(item.name)} className={`main-items-left-cont-item ${subCategory === item.name && "selected-item-style"}`} >
                            <img src={item.img} alt={item.name} className='main-items-left-cont-item-img' />
                            <span className='main-items-left-cont-item-name'>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

  return (
    <div className='main-items-cont'>
        <Header />
        <div>
            <div className='main-items-cont-bottom'>
                {category === 'fruits' ? fruitsOne() : null}
                <div className='main-items-bottom-right-cont'>
                    <div className='main-items-bottom-right-cont-head-cont'>
                        <h1>Fruits</h1>
                        <div className='main-items-search-cont'>
                            <input placeholder='Search' id="searchOne" type='search' className='search-input' />
                            <label htmlFor='searchOne' className='searchOne'>
                                <IoSearchSharp className='search-icon' />
                            </label>
                        </div>
                    </div>
                    {status === statusOne.LOADING ? loadingView() :                     <ul className='main-items-bottom-right-cont-list'>
                        {items.slice(0, 30).map((item) => (
                            <EveryItem key={item.id} name={item.name} price={item.price}/>
                        ))}    
                    </ul> }

                </div>

                <div></div>
            </div>
        </div>
    </div>
  )
}

export default MainItemsCont
