const client = supabase.createClient(
"https://kbhjuliwskwfuboogcxr.supabase.co",
"ТВОЙ_ANON_KEY"
);


async function register(){

let username = document.getElementById("username").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;


let {data,error} = await client.auth.signUp({
    email: email,
    password: password
});


if(error){
    alert(error.message);
    console.log(error);
    return;
}


if(!data.user){
    alert("Пользователь не создан");
    return;
}


let {error:profileError}=await client
.from("profiles")
.insert({
    id:data.user.id,
    username:username
});


if(profileError){
    alert(profileError.message);
    console.log(profileError);
    return;
}


alert("Аккаунт создан!");

}
