//üyelik Oluştur

const uyelikForm = document.querySelector("#signup-form");

uyelikForm.addEventListener("submit", (e)=>{
    e.preventDefault();
  
    const email =uyelikForm['signup-email'].value;
    const parola= uyelikForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,parola).then(sonuc=>{
        console.log(sonuc.user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        uyelikForm.reset();
    
    
    });

});

//çıkış işlemi
const cikis=document.querySelector("#logout");
cikis.addEventListener("click", (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("Çıkış işlemi başarılı");
    });
});