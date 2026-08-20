const client = supabase.createClient(
"https://kbhjuliwskwfuboogcxr.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaGp1bGl3c2t3ZnVib29nY3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNDA2NjEsImV4cCI6MjEwMjYxNjY2MX0.icHSaaVztXBPom3viJQp0w38AlqO1uYZ2ok2nWPYmoQ"
);

async function register(){

let username=document.getElementById("username").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let {data,error}=await client.auth.signUp({
 email,
 password
});

if(error){
 alert(error.message);
 return;
}

if(!data.user){
 alert("Пользователь не создан");
 return;
}

let {error:profileError}=await client.from("profiles").insert({
 id:data.user.id,
 username,
 email
});

if(profileError){
 alert(profileError.message);
 return;
}

alert("Аккаунт создан");
}


async function login(){

let username=document.getElementById("username").value;
let password=document.getElementById("password").value;

let {data,error}=await client
.from("profiles")
.select("email")
.eq("username",username)
.single();

if(error){
 alert("Пользователь не найден");
 return;
}

let result=await client.auth.signInWithPassword({
 email:data.email,
 password
});

if(result.error){
 alert(result.error.message);
 return;
}

alert("Вход выполнен");
}
