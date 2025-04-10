import { useState } from "react"
import "../Validering/form.css"
import Joi, { number } from "joi"


const schema = Joi.object({
	name: Joi.string()
		.min(5)
		.max(20)
		.required(),

	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),

	land: Joi.string()
		.min(20)
		.max(40)
		.required(),

	age: Joi.number()
		.min(10)
		.max(30)
		.required(),

	pass: Joi.string()
		.min(5)
		.max(20)
		.required(),

	lang: Joi.string()
		.required(),
});


function Form(){

	

	const[data,setData]=useState({
		name:"",
		email:"",
		land:"",
		age:"",
		pass:"",
		lang:""

	})

let message={
	name:"",
		email:"",
		land:"",
		age:"",
		pass:"",
		lang:""
}
let css={
	name:"",
		email:"",
		land:"",
		age:"",
		pass:"",
		lang:""
}
const [focus,setFocus]=useState({
	name:false,
		email:false,
		land:false,
		age:false,
		pass:false,
		lang:false
})
const result=schema.validate(data);
	console.log(result)

	if(result.error){
		result.error.details.forEach(item=>{
			let field=item.context.key
			if(focus[field]){
				if(field==="name"){
				message.name="please write your name between 5 and 20"
				css.name="invalid"
			}
			if(field==="email"){
				message.email="please write your post in right form"
				css.email="invalid"
			}
			if(field==="land"){
				message.land="please write your name between 20 and 40"
				css.land="invalid"
			}
			if(field==="age"){
				message.age="you must be between 20 and 30"
				css.age="invalid"
			}
			if(field==="pass"){
				message.pass="your pass must be between 5 and 20"
				css.pass="invalid"
			}if(field==="lang"){
				message.lang="please select your language"
				css.lang="invalid"
			}
			}
			
		}
			
		)
	}
	const formValid=!result.error;

	return(
		<div className="form">
		<div>
		<label htmlFor="name">Namn: </label>
		<input type="text" placeholder="Namn
" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} className={css.name} onBlur={() => setFocus({...focus, name: true})}
/>
<p className="message-style">{message.name}</p>
		</div>
		<div>
		<label htmlFor="post">Epost Adress: </label>
		<input type="text" placeholder="e-post
" id="post" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} className={css.email} onBlur={() => setFocus({...focus, email: true})}/>
<p className="message-style">{message.email}</p>
		</div>
		<div>
		<label htmlFor="land">Land: </label>
		<input type="text" placeholder="Land
" id="land" value={data.land} onChange={(e)=>setData({...data,land:e.target.value})} className={css.land} onBlur={() => setFocus({...focus, land: true})} />
<p className="message-style">{message.land}</p>
		</div>
		<div>
		<label htmlFor="ålder">Ålder: </label>
		<input type="number" placeholder="ålder
" id="ålder" value={data.age} onChange={(e)=>setData({...data,age:Number(e.target.value)})} className={css.age} onBlur={() => setFocus({...focus, age: true})}/>
<p className="message-style">{message.age}</p>
		</div>
		<div>
		<label htmlFor="pass">Lösenord: </label>
		<input type="password" placeholder="ålder
" id="pass" value={data.pass} onChange={(e)=>setData({...data,pass:e.target.value})} className={css.pass} onBlur={() => setFocus({...focus, pass: true})}/>
<p className="message-style">{message.pass}</p>
		</div>
		<div>
		<label htmlFor="språk" >Språkval: </label>
		<select id="språk" value={data.lang} onChange={(e)=>setData({...data,lang:e.target.value})} className={css.lang} onBlur={() => setFocus({...focus, lang: true})}>
		<option value="svenska" >Svenska</option>
		<option select="true" value="Engelska">Engelska</option>
		<option value="norska">Norska</option>
		
		</select>
		<p className="message-style">{message.lang}</p>
		</div>
		<div className="button-form"><button disabled={!formValid}>Submit</button></div>
		
		</div>
	)
}
export default Form