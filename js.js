document.addEventListener("DOMContentLoaded",()=>{
    const bird=document.querySelector("#bird");
    const wrapper=document.querySelector("#game_wrapper");
    const menu=document.querySelector("#menu");
    const new_game=document.querySelector(".option")

    let bird_position_x=200;
    let bird_position_y=200;
    const gravity=3;
    const jump=50;
    let isgameover=false;
    let interval_id=null
    
                        //------------------------------------bird----------------------------------------------
    function start_game(){
        bird_position_y-=gravity;
        bird.style.bottom=bird_position_y+"px";
        bird.style.left=bird_position_x+"px";      
    }
  
    function jumping(){
        bird_position_y+=jump
        bird.style.bottom=bird_position_y+"px";
    }

    function space_press(e){
        if(e.keyCode==32){
                jumping()
        }
    }
    
    
    //----------------------------------------------------- end of bird---------------------------------------------------------
   
    
    function generate_obstacle(){

        let obst_position_x=500;
        let obst_position_y=200
        let obst_height=Math.random()*300;
        let top_obst_height=450-obst_height;
        
       
        const obstacle=document.createElement("div");
        const top_obstacle=document.createElement("div");
        obstacle.classList.add("obst");
        top_obstacle.classList.add("top_obst");
        if(isgameover!=true){
            wrapper.appendChild(obstacle);
            wrapper.appendChild(top_obstacle);
            }
        obstacle.style.left=obst_position_x+"px";
        obstacle.style.bottom=obst_position_y+"px"
        obstacle.style.height=obst_height+"px"
        
        top_obstacle.style.left=obst_position_x+"px";
        top_obstacle.style.top=0
        top_obstacle.style.height=top_obst_height+"px"
        
        function move(){
            obst_position_x -=2
            if(isgameover!=true){
               
            obstacle.style.left= obst_position_x+"px"
            top_obstacle.style.left=obst_position_x+"px"

            }else { 
                clearInterval(interval_move_ob)
                clearTimeout(timeout_id)
                clearInterval(interval_id)
                interval_id=null

                setTimeout(()=>{
                    menu.style.display = "flex"
                    wrapper.removeChild(obstacle)
                    wrapper.removeChild(top_obstacle)
                }, 500)
                
            }
            
            if( obst_position_x<=-60){
                clearInterval(interval_move_ob)
                wrapper.removeChild(obstacle)
                wrapper.removeChild(top_obstacle)
            }
            if(bird_position_y<=0 || (( obst_position_x<250 &&  obst_position_x>140) && (bird_position_y<obst_height||top_obst_height>580-50-bird_position_y) )){
                isgameover=true;
                document.removeEventListener("keydown",space_press)
               
                
               
            }   
            
        }

        if(interval_id==null){
            interval_id=setInterval( start_game,20);
        }

        let interval_move_ob=setInterval(move,20)
        let timeout_id= setTimeout(generate_obstacle,3000) 
        
     


    }
    
 
    function start(){
        isgameover=false
  
        bird_position_y=200;
        bird_position_x=200; 
        menu.style.display = "none"
        generate_obstacle()
        document.addEventListener("keydown",space_press)
    }
    
    

    

    new_game.onclick=start
    


})



