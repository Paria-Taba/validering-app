import { useState } from "react"
import "../Validering/Validering.css"
import joi from "joi"
const schema=joi.object({
	name:joi.string()
	.min(1)
	.max(10)
	.required(),
	
	aftername:joi.string()
	.min(1)
	.max(20)
	.required(),
	
	email:joi.string()
	.email({ tlds: false })
})

function ValideringInput(){
	
	const[data,setData]=useState(
		{
			name:"",
			aftername:"",
			email:""
		}
	)
	const[touched,setTouched]=useState({
		name:false,
		aftername:false,
		email:false
	})
	let message={
		name:"",
		aftername:"",
		email:""
	}
	let css={
		name:"",
		email:"",
		aftername:""
	}
	const result=schema.validate(data)
	
	if(result.error){
		result.error.details.forEach(item=>{
			const field=item.context.key
			if(touched[field]){
				if(field==="name"){
					message.name="please write your name between 1 and 10"
					css.name="invalid"
					
				}else{
					css.name="valid"
				}
				if(field==="aftername"){
					message.aftername="please write your aftername between 1 and 20"
					css.aftername="invalid"
					
				}else{
					css.aftername="valid"
				}
				 if(field==="email"){
					message.email="please write your email in right form"
					css.email="invalid"
					
				}else {	css.email="valid"}

				
				
				
			}
			
			
		}
		
	)
}
function resetButton(){
	setData({
		name:"",
		aftername:"",
		email:""
	})
}

const formIsValid=!result.error
return(
	<form action="#">
	<h1>Validering</h1>
	<div className="form">
	<div >
	<label htmlFor="namn">Förnamn:</label>
	<input type="text" placeholder="Ditt namn" id="namn" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} onBlur={()=>setTouched({...touched, name:true})} className={css.name}/>
<p>{message.name}
		</p>
		
		</div>
		<div>
		<label htmlFor="efternamn">Efternamn:</label>
		<input type="text" placeholder="Ditt efternamn" id="efternamn" value={data.aftername} onChange={(e)=>setData({...data,aftername:e.target.value})} onBlur={()=>setTouched({...touched, aftername:true})} className={css.aftername} />
		<p>{message.aftername}
		</p>
		
		</div>
		<div >
		<label htmlFor="epost">E-post adress:</label>
		<input type="text" placeholder="e-post" id="epost" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} onBlur={()=>setTouched({...touched, email:true})} className={css.email}/>
		
		<p>{message.email}
		</p>
		</div>
		</div>
		<div className="form-button">
		<button disabled={!formIsValid} >Spara</button>
		<button onClick={resetButton}>Släng</button>
		</div>
		</form>
		
	)
}
export default ValideringInput