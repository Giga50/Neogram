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

await client.from("profiles").insert({
 id:data.user.id,
 username:username
});

alert("Аккаунт создан");
}
