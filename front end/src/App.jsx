import axios from 'axios'
import React from 'react'


const App = () => {

  const [num,setNum]=React.useState(0)
  const [fraseInput,setFraseInput]=React.useState("")
  const [authorInput,setAutorInput]=React.useState("")
  const [fraseEnviada,setFraseEnviada]=React.useState([])
  const [quote,setQuote]=React.useState("")
  const [author,setAuthor]=React.useState("")
  const [color,setColor]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [modal,setModal]=React.useState(false)
  const [status,setStatus]=React.useState(false)
  const inputRef = React.useRef()
  const colors = ['bg-red-500', 'bg-blue-800', 'bg-green-500', 'bg-yellow-500','bg-purple-500']


  const app = axios.create({
  baseURL:`https://apifrases.onrender.com/api`
  })

  const getFrase= async ()=>{
    setLoading(true)
   const numCor= Math.floor(Math.random() * colors.length)
   setColor(numCor)
   console.log(numCor)
    const result = await app.get("/frases")
    const numAleatorio =Math.floor(Math.random() * result.data.length)
    setNum(numAleatorio)
    setFraseInput(result.data[num].quote)
    setAutorInput(result.data[num].author)
    setLoading(false)
  }

 const enviarFrase= async ()=>{
  if(!author){
    alert("O Autor deve ser preenchido, caso nao conheça, coloque como desconhecido.")
  }
  if(!quote){
    alert("O Frase deve ser preenchida.")
  }

  await app.post("/frases", {
    quote,author
  })

  setFraseEnviada([...fraseEnviada, quote])

  setQuote("")
  setAuthor("")
  inputRef.current.focus()
  setStatus(true)

  setInterval(()=>{
    setStatus(false)
  },1500)

  }


  React.useEffect(()=>{
    getFrase()
  },[])

  const openModal = ()=>{
    setModal(!modal)
    setFraseEnviada([])
  }

  

  return (
  
      <div className={`estrutura ${colors[color]} h-screen w-screen relative p-[10px] lg:p-[180px]`}>
      {loading && <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin duration-1000 ease-in-out"></div> }
      {
        !loading && <div>
        <blockquote>
        <p className='frase leading-[22px] lg:leading-[35px] tracking-wider text-[1.2rem] lg:text-[1.9rem]'>{fraseInput}</p>
        <cite className='autor'>{authorInput}</cite>
      </blockquote>
       
        <div className='flex gap-2'>
        <button className='text-white button w-max' onClick={getFrase}>Motive-me</button>
        <button onClick={openModal} className=' bg-black text-white px-2 py-2 button'>Envie sua frase</button>
        </div>
        </div> 
      }
      <footer className='absolute bottom-[320px] lg:left-[180px]'>feito por <a href="https://www.linkedin.com/in/clenilson-brandao-costa-773902185/" target='_blank' className='text-red-600 underline'>Klenilson Rox</a></footer>
      {modal && <div className='absolute  right-0 left-0 bottom-0 top-0 flex items-center justify-center modal'>
        <div className='bg-white w-screen max-w-lg p-4 relative animaModal'>
        <button className='absolute right-0 top-[-28px] bg-white text-red-600 w-[20px] font-bold' onClick={openModal}>X</button>
          <p className='text-center font-semibold text-[20px]'>ENVIAR FRASE</p>
          <hr />
          <div className='flex flex-col mt-4 relative'>
            <label htmlFor="quote" className='font-semibold mb-1' ref={inputRef}>Digite sua frase:</label>
            <input type="text" id='quote' className='border mb-4 py-2 outline-none' placeholder='Digite a frase' value={quote} onChange={({target})=>setQuote(target.value)}/>
            <label htmlFor="quote" className='font-semibold mb-1 '>Digite o autor:</label>
            <input type="text" id='quote' className='border mb-4 py-2 outline-none' placeholder='Digite o nome do autor' value={author} onChange={({target})=>setAuthor(target.value)}/>
            <button className='bg-purple-400 max-w-[100px] py-2 px-6 mx-auto font-semibold text-white' onClick={enviarFrase}>ENVIAR</button>
            {status && <p className='relative bottom-0 mt-7 text-center font-semibold text-red-600'>sua frase foi enviada</p> }
            <div className='mt-4 overflow-y-scroll h-[300px]'>
            {fraseEnviada.length > 0 ? <h1 className='text-center mb-4 text-[20px] font-semibold'>Frases enviadas</h1>:""}
              {fraseEnviada && fraseEnviada.map((quote)=> <p className='bg-slate-200 p-2 mb-4'>{quote}</p> )}
            </div>
          </div>
        </div>
      </div> }
        </div>

  )
}

export default App
