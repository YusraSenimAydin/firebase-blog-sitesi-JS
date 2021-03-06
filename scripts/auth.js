//auth durumu izle

auth.onAuthStateChanged(k=>{
    if(k){
        console.log("Giriş işlemi başarılı");
        db.collection('makaleler').onSnapshot(snapshot=>{
           // console.log(snapshot);
           makaleYukle(snapshot.docs);
           kullaniciYukle(k);
        })
    }else{
        console.log("Çıkış işlemi başarılı");
        makaleYukle([]);
        kullaniciYukle();
    }
})


//makale oluştur 
 const makaleOlusturForm = document.querySelector('#create-form');

 makaleOlusturForm.addEventListener('submit',(e)=>{
     e.preventDefault();

     db.collection('makaleler').add({
         baslik:makaleOlusturForm["title"].value,
         icerik:makaleOlusturForm["content"].value
     }).then(()=>{
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        uyelikForm.reset();
     }).catch(err=>{
         console.log(err.message);
     })

 })


//üyelik Oluştur

const uyelikForm = document.querySelector("#signup-form");

uyelikForm.addEventListener("submit", (e)=>{
    e.preventDefault();
  
    const email =uyelikForm['signup-email'].value;
    const parola= uyelikForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,parola).then(sonuc=>{
        console.log(sonuc.user);

        return db.collection("kullanicilar").doc(sonuc.user.uid).set({
            bio:uyelikForm['signup-bio'].value
        }).then(()=>{
            const modal = document.querySelector("#modal-signup");
            M.Modal.getInstance(modal).close();
            uyelikForm.reset();

        })
       
    
    
    });

});

//çıkış işlemi
const cikis=document.querySelector("#logout");
cikis.addEventListener("click", (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        //console.log("Çıkış işlemi başarılı");
    });
});

//giriş işlemi

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const mail = loginForm["login-email"].value;
    const parola=loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(mail, parola).then((sonuc)=>{
         console.log(sonuc.user);

          const modal = document.querySelector("#modal-login");
           M.Modal.getInstance(modal).close();

           loginForm.reset();
    }).catch((err)=>{
        console.log(err);
    })

})