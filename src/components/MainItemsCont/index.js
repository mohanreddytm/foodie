import React, {useState, useEffect } from 'react'
import Header from '../Header'
import { Hourglass } from 'react-loader-spinner'
import Cookies from 'js-cookie'
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
    const [searchOne, setSearchOne] = useState("")
    const [status, setStatus] = useState(statusOne.LOADING);
    const {category,subCategory} = useParams()
    console.log(category, subCategory, "this")


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
            let oneCategory = "Fruits"
            setStatus(statusOne.LOADING)
            if (category === "Fruits"){
                oneCategory = "Fruits"
            }else{
                oneCategory = "Vegetables"
            }

            let oneSub = "vegetables"

            if(subCategory === "vegetables" || subCategory === "fruits"){
                console.log("entered into on ")
                oneSub = ""
            }else if(category === "Fruits"){
                oneSub = subCategory.split(' ')[0]
            }else{
                console.log(subCategory)
                oneSub = encodeURIComponent(subCategory);
            }
            const response = await fetch(`https://forfoodie.onrender.com/products/${oneCategory}/${oneSub}`)

            const data = await response.json()
            console.log(data);
            
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
        window.location.href = `/items/Fruits/${item}`;

    }

    const onClickEachItemVeg = async (item) => {
        window.location.href = `/items/Vegetables/${item}`;

    }

    const onClickEachItemVegetables = async (item) => {
        window.location.href = `/items/Vegetables/${item}`;
    }
        


    const onchangesearhOne = (e) => {
            setSearchOne(e.target.value)
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

    const vegetablesOne = () => {
        const VegetablesUrl = "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg?t=st=1744972905~exp=1744976505~hmac=2eb29e971a7f75e006e691345f75b6f83da52249de55f8d6c0b387aee40b67e6&w=1480"

        const vegetablesSubCategory = [
            {img : "http://img.freepik.com/free-photo/front-view-fresh-vegetables-cabbage-parsley-bell-peppers-lettuce-dill-cauliflower-dark-surface_140725-62446.jpg?t=st=1744972100~exp=1744975700~hmac=ec1413b242aa2bca3953db12daad9ef93e12c20c58450d96371166d858352f10&w=1480",name: "Cruciferous"},
            {img : "https://img.freepik.com/free-photo/front-view-colorful-pumpkins-different-sizes_23-2148263090.jpg?t=st=1744972268~exp=1744975868~hmac=a11431a13442f6f0b9ca5b8f7a5d2bcbdaacf8fe286e89992820aa84a705e0b5&w=1480" ,name: "Squash"},
            {img : "https://img.freepik.com/free-photo/broccoli-coriander-leaves-lettuce-stone-surface-high-quality-photo_114579-27253.jpg?t=st=1744972340~exp=1744975940~hmac=e1a47b871958a77edfbe73963a3539955d808b7921e320907a8cd2f63c48e207&w=1480", name: "Leafy Green"},
            {img : "https://img.freepik.com/free-photo/carrots-different-colors-with-roots_181624-3898.jpg?t=st=1744972409~exp=1744976009~hmac=51a9392f06824644bb6c41f31a573173739537ee61b172ede25d2cb6964785ea&w=996", name:"Stem"},
            {img : "https://img.freepik.com/free-photo/superfoods-seeds-grains-vegan-vegetarian-eating-clean-eating_114579-3939.jpg?t=st=1744972457~exp=1744976057~hmac=fee18dab67478876d6d8e11168201b0a2bf5daab2d968b875f1fec7a00d97faa&w=1480", name:"Grain"},
            {img : "https://img.freepik.com/free-photo/set-knife-other-zucchinis-bowl-around-sliced-zucchinis-dark-wooden-table-flat-lay_176474-1561.jpg?t=st=1744972557~exp=1744976157~hmac=c68d18f81754eab11dd957281c962fe25fb8292fac098c363eb952530959897d&w=1480",name:"Summer Squash"},
            {img : "https://img.freepik.com/free-photo/food-vegetable-colorful-background-tasty-fresh-vegetables-wooden-box-wooden-table-kitchen-background-copy-space-toning_1220-1219.jpg?t=st=1744972627~exp=1744976227~hmac=74ec3a15c769c0e7eb77d1491d448b88abed676cb74898d7034ac8a3841c8908&w=1800" ,name:"Flowering"},
            {img : "https://img.freepik.com/free-photo/mushrooms-carrots-with-soil_23-2147681754.jpg?t=st=1744972681~exp=1744976281~hmac=94261cc5428c6743471b6e5af896cebc2115b92836188656a5eaee98d3bfbd6c&w=1480", name:"Fungus"},
            {img : "https://img.freepik.com/free-photo/front-view-fresh-vegetables-with-seasonings-peppers-grey-table_140725-133814.jpg?t=st=1744972729~exp=1744976329~hmac=f2dcaa636e5b8f858adf923520d723921471cd6ac1302d1df839a34dc97081f0&w=1480", name:"Spicy"}
          ]
          return (
            <div className='main-items-bottom-left-cont'>
                <div className={`main-items-left-cont-item main-items-left-cont-item-main ${subCategory === 'vegetables' && "selected-item-style"}`} onClick={() => onClickEachItemVeg("vegetables")}>
                    <img src={VegetablesUrl} alt="vegetable" className='main-items-left-cont-item-img' />
                    <h1 className='main-items-left-cont-item-name'>Vegetables</h1>
                </div>
                <ul className='main-items-left-cont'>
                    {vegetablesSubCategory.map((item) => (
                        <li key={item.name} onClick={() => onClickEachItemVegetables(item.name)} className={`main-items-left-cont-item ${subCategory === item.name && "selected-item-style"}`} >
                            <img src={item.img} alt={item.name} className='main-items-left-cont-item-img' />
                            <span className='main-items-left-cont-item-name'>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

    const emptyItemsView = () => {
        return (
        <div className='empty-view-items-cont'>
            <img src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?t=st=1745118988~exp=1745122588~hmac=3ddd8f39373dcaff7e492d6934d912dc74029c5edb0c2d384ae426291d68a0f5&w=996" alt="empty item" className='empty-item-image' />
            <h1 className='empty-view-items-head'>Their are no Items!</h1>
            <button onClick={() => setSearchOne("")} className='empty-view-items-button'>Refresh</button>
        </div>)
    }


    const filteredData = items.filter(eachItem => eachItem.name.toLowerCase().includes(searchOne.toLowerCase()))
    // console.log(filteredData)

  return (
    <div className='main-items-cont'>
        <Header />
        <div className='miain-bottom'>
            <div className='main-items-cont-bottom'>
                {category === 'Fruits' ? fruitsOne() : vegetablesOne()}
                <div className='main-items-bottom-right-cont'>
                    <div className='main-items-bottom-right-cont-head-cont'>
                        <h1>Fruits</h1>
                        <div className='main-items-search-cont'>
                            <input value={searchOne} onChange={onchangesearhOne} placeholder='Search' id="searchOne" type='search' className='search-input' />
                            <label htmlFor='searchOne' className='searchOne'>
                                <IoSearchSharp className='search-icon' />
                            </label>
                        </div>
                    </div>
                    {}
                    {status === statusOne.LOADING ? loadingView() : (         
                    filteredData.length === 0 ? emptyItemsView() :        
                    <ul className='main-items-bottom-right-cont-list'>
                        {filteredData.map((item) => (
                            <EveryItem key={item.id} id={item.id} name={item.name} price={item.price}/>
                        ))}    
                    </ul>) }

                </div>

                <div></div>
            </div>
        </div>
    </div>
  )
}

export default MainItemsCont
