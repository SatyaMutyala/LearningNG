var work = function(){
    console.log("Working Hard!");
}

var doWork = function(f){
    console.log("Starting");
    try
    {
        f();
    }
    catch(ex)
    {
        console.log(ex);
    }
    console.log("End");
}

doWork(work);