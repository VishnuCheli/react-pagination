import './App.css';

import {useEffect, useState} from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async() => {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    const data = await res.json();
    
    if(data && data.products){
      setProducts(data.products);}
  };

  console.log(products);

  useEffect(() => { 
    fetchProducts();
  },[]); //keeping the second param with empty array calls the useEffect once after page renders

  const selectPageHandler = (selectedPage) =>{
    if(selectedPage>=1 && selectedPage<=(products.length/10) && selectedPage!==page){
      setPage(selectedPage);}
  };

  return (
    <div className="App">
      { //js expression for conditional rendering
      products.length>0 && (<div className="products">
        { // calls the condition rendering block so javascript function map can create JSX span elements
          products.slice((page*10)-10,page*10).map((prod)=>{
            return(
            <span className="products__single">
              <img src={prod.thumbnail} alt ={prod.title}/>
              <span>{prod.title}</span>
            </span>
            )

          })
        }
      </div>)
      }
      {
        products.length>0 && (<div className="pagination">
          <span key ={page-1} onClick={()=>selectPageHandler(page-1)} className={page> 1 ? "":"pagination__disable"}>⬅️</span>
          {
            [...Array((products.length)/10)].map((_,i)=>{
              return <span key={i} className={page === i+1? "pagination__selected":""} onClick={()=>selectPageHandler(i+1)}>{i+1}</span>
            })
          }
          <span key={page+1} onClick={()=>selectPageHandler(page+1)} className={page< products.length/10 ? "":"pagination__disable"}>➡️</span>
          </div>)
      }
    </div>
  );
}

export default App;
