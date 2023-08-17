let previousPeice=null;
let turn,eatablePeices=[];

//FIRST TIME TURN SELECTOR
turnSelector();
function turnSelector()
{
	turn = Math.floor(Math.random()*3);
	switchTurn();
}

function switchTurn()
{
	if(turn == 1)
	  {
		  document.getElementById('firstPlayer').style.display = 'unset';
		  document.getElementById('secondPlayer').style.display = 'none';
		  turn = 2;
	  }
	  else
	  {
		  document.getElementById('secondPlayer').style.display = 'unset';
		  document.getElementById('firstPlayer').style.display = 'none';
		  turn = 1;
	  }
	  
}

function showMoves(p)
{
	//ID without s eg s12 --> 12
	const id = Number(p.id.slice(1,p.id.length));
    
	console.log(eatablePeices);
	//move peice
	if(p.textContent == 'x' || eatablePeices.includes(p))
      {
		p.textContent = previousPeice.textContent;
		previousPeice.textContent = '';
		moved = true;
		switchTurn();
		eatablePeices = [];
		clearCross();
		return;
	  }
	  
	  clearCross();
	 
     //eat peice
	
		eatablePeices = [];
		
		previousPeice = p;
	   //white pawn
	if(p.textContent.toUpperCase() == 'WP')
	{
		//if front square is free
       if(document.getElementById('s'+(id+8)).textContent == '')
	   {
		//put cross in front it
		document.getElementById('s'+(id+8)).textContent = 'x';
		//if it's first move and 2nd front square is free
		if(id<17 && document.getElementById('s'+(id+16)).textContent == '')
		document.getElementById('s'+(id+16)).textContent = 'x'; 
	   }
		 
	}  

	 //black pawn
	 if(p.textContent.toUpperCase() == 'BP')
	 { 
		 //if front square is free
		if(document.getElementById('s'+(id-8)).textContent == '')
		{
		 //put cross in front it
		 document.getElementById('s'+(id-8)).textContent = 'x';

		 //if it's first move and 2nd front square is free
		 if(id>48 && document.getElementById('s'+(id-16)).textContent == '')
		 document.getElementById('s'+(id-16)).textContent = 'x'; 
		}
		
	 }

	 //Tank
	 if(p.textContent.toUpperCase() == 'WT' || p.textContent.toUpperCase() == 'BT'  )
	 {
		let i;

		//left
       for(i =id;i>1 && (i-1)%8 != 0 &&document.getElementById('s'+(i-1)).textContent=='';i--) 
	   document.getElementById('s'+(i-1)).textContent = 'x';
	   
	   //right
		for(i =id; i%8!=0 && document.getElementById('s'+(i+1)).textContent=='';i++) 
		{
			document.getElementById('s'+(i+1) ).textContent = 'x';
		}

		//bottom
		for(i =id;i<57 && document.getElementById('s'+(i+8)).textContent=='';i+=8) 
		  	document.getElementById('s'+(i+8)).textContent = 'x';
			
		//top
		for(i =id;i>8&&document.getElementById('s'+(i-8)).textContent=='';i-=8) 
			document.getElementById('s'+(i-8)).textContent = 'x';
	 
	}

	  //Crosser
	  if(p.textContent.toUpperCase() == 'WC' || p.textContent.toUpperCase() == 'BC'  )
	  {
		let i;

		//Top left
		if( (id-1)%8 !=0  &&  id>8 )//Must not be first column or first row
		for(i=id-9; i>0 && i%8!=0 && document.getElementById('s'+i).textContent == '';i -=9 )
           document.getElementById('s'+i).textContent = 'x';
		
		if( i>0  &&  i%8 != 0 )//stopped because of other peice
          checkForEatable(p,i);

		//Top Right
		if( id>8 && id%8 != 0 )//Must not be first row or last column 
		for(i=id-7; i>0 && document.getElementById('s'+i).textContent == '';i -=7 )
		{
			document.getElementById('s'+i).textContent = 'x';
			if(i%8 == 0)//stop on edge
			break;
		}

		if(i>0 && i%8 !=0)
		checkForEatable(p,i);


		//Down Left
		if( id<57 && (id-1)%8 !=0)//Must not be last row or first column
			for(i=id+7; i<65 && i%8!=0 && document.getElementById('s'+i).textContent == ''; i+=7 )//Must not be last column and id more than 60
			document.getElementById('s'+i).textContent = 'x';

		if(i<65 && i%8!=0)
		checkForEatable(p,i);


		//Down Right
		if(id<57 && id%8 !== 0)//Must not be last row or last column
		for(i=id+9; i<65 && document.getElementById('s'+i).textContent == ''; i+=9 )
		{
			document.getElementById('s'+i).textContent = 'x';
			if(i%8 == 0)
			break;
		}
		
		if(i<65 && document.getElementById('s'+i).textContent != 'x'&& document.getElementById('s'+i).textContent != '' )
		checkForEatable(p,i);
		
	  }

	  //Horse
	  if(p.textContent.toUpperCase() == 'WH' || p.textContent.toUpperCase() == 'BH'  )
	  {
		
		// Top left
		if( id>16 && (id-1)%8 !=0  )//Must not be in first 2 rows OR first column
		if( document.getElementById('s'+(id-17)).textContent=='')
		document.getElementById('s'+(id-17)).textContent='x';

		// Top Right
		if( id>16 && id%8 != 0 )
		if( document.getElementById('s'+(id-15)).textContent=='')
		document.getElementById('s'+(id-15)).textContent='x';

		// Bottom Right
		if( id<49 && id%8 !=0 )//Must not be in last two rows OR last column
		if( document.getElementById('s'+(id+17)).textContent=='')
		document.getElementById('s'+(id+17)).textContent='x';

		// Bottom Left
		if( id<49 && (id-1)%8 !=0 )//Must not be in last two rows OR iat column
		if( id+15 < 65 && id+15<65 && document.getElementById('s'+(id+15)).textContent=='')
		document.getElementById('s'+(id+15)).textContent='x';
		
		//Left Up
		if( (id-1)%8 != 0 && (id-2)%8 != 0 && id>8  )//Must not be in ist two columns and ist row
		if(  document.getElementById('s'+(id-10)).textContent=='')
		document.getElementById('s'+(id-10)).textContent='x';

		//Left Down
		if( (id-1)%8 != 0 && (id-2)%8 != 0 && id<57  )//Must not be in ist two columns and last row
		if( document.getElementById('s'+(id+6)).textContent=='')
		document.getElementById('s'+(id+6)).textContent='x';

		//Right Up
		if( id%8 != 0 && (id+1)%8 != 0 && id>8  )//Must not be in last two columns and ist row
		if( document.getElementById('s'+(id-6)).textContent=='')
		document.getElementById('s'+(id-6)).textContent='x';

		//Right Down
		if( id%8 != 0 && (id+1)%8 != 0 && id<57  )//Must not be in last two columns and ist row
		if( document.getElementById('s'+(id+10)).textContent=='')
		document.getElementById('s'+(id+10)).textContent='x';

	  }

	  //Queen
	  if(p.textContent.toUpperCase() == 'WQ' || p.textContent.toUpperCase() == 'BQ'  )
	  {
		//Crosser's Code

		let i;

		//Top left
		if( (id-1)%8 !=0  &&  id>8 )//Must not be first column or first row
		for(i=id-9; i>0 && i%8!=0 && document.getElementById('s'+i).textContent == '';i -=9 )
           document.getElementById('s'+i).textContent = 'x';
		
		if( i>0  &&  i%8 != 0 )//stopped because of other peice
          checkForEatable(p,i);

		//Top Right
		if( id>8 && id%8 != 0 )//Must not be first row or last column 
		for(i=id-7; i>0 && document.getElementById('s'+i).textContent == '';i -=7 )
		{
			document.getElementById('s'+i).textContent = 'x';
			if(i%8 == 0)//stop on edge
			break;
		}

		if(i>0 && i%8 !=0)
		checkForEatable(p,i);


		//Down Left
		if( id<57 && (id-1)%8 !=0)//Must not be last row or first column
			for(i=id+7; i<65 && i%8!=0 && document.getElementById('s'+i).textContent == ''; i+=7 )//Must not be last column and id more than 60
			document.getElementById('s'+i).textContent = 'x';

		if(i<65 && i%8!=0)
		checkForEatable(p,i);


		//Down Right
		if(id<57 && id%8 !== 0)//Must not be last row or last column
		for(i=id+9; i<65 && document.getElementById('s'+i).textContent == ''; i+=9 )
		{
			document.getElementById('s'+i).textContent = 'x';
			if(i%8 == 0)
			break;
		}
		
		if(i<65 && document.getElementById('s'+i).textContent != 'x'&& document.getElementById('s'+i).textContent != '' )
		checkForEatable(p,i);

		//Tank's Code

		//left
		for(i =id;i>1 && (i-1)%8 != 0 &&document.getElementById('s'+(i-1)).textContent=='';i--) 
		document.getElementById('s'+(i-1)).textContent = 'x';
		
		//right
		 for(i =id; i%8!=0 && document.getElementById('s'+(i+1)).textContent=='';i++) 
		 {
			 document.getElementById('s'+(i+1) ).textContent = 'x';
		 }
 
		 //bottom
		 for(i =id;i<57 && document.getElementById('s'+(i+8)).textContent=='';i+=8) 
			   document.getElementById('s'+(i+8)).textContent = 'x';
			 
		 //top
		 for(i =id;i>8&&document.getElementById('s'+(i-8)).textContent=='';i-=8) 
			 document.getElementById('s'+(i-8)).textContent = 'x'; 
		}

	  //King
	  if(p.textContent.toUpperCase() == 'WK' || p.textContent.toUpperCase() == 'BK'  )
	  {
		//Up
		if(id>8)//Must not be in first row
		if( document.getElementById('s'+(id-8)).textContent=='' )
		document.getElementById('s'+(id-8)).textContent='x';

		//Down
		if(id<57)//Must not be in last row
		if( document.getElementById('s'+(id+8)).textContent=='')
		document.getElementById('s'+(id+8)).textContent='x';

		//Left
		if( (id-1)%8 != 0 )//Must not be in first column
		if( document.getElementById('s'+(id-1)).textContent=='')
		document.getElementById('s'+(id-1)).textContent='x';

		//Right
		if(id%8!=0)//Must not be in last column
		if( document.getElementById('s'+(id+1)).textContent=='')
		document.getElementById('s'+(id+1)).textContent='x';

		//Up Left
		if( id>8 && (id-1)%8 != 0  )//Must not be in first row OR first column
		if( document.getElementById('s'+(id-9)).textContent=='')
		document.getElementById('s'+(id-9)).textContent='x';

		//Up Right
		if( id>8 && id%8!=0 )//Must not be in ist row OR last column
		if(document.getElementById('s'+(id-7)).textContent=='')
		document.getElementById('s'+(id-7)).textContent='x';

		//Down Left
		if( id<57 && (id-1)%8 != 0  )//Must not be in last row OR last column
		if( document.getElementById('s'+(id+7)).textContent=='')
		document.getElementById('s'+(id+7)).textContent='x';

		//Down Right
		if( id<57 && id%8!=0 )//Must not be in last row OR ist column
		if( document.getElementById('s'+(id+9)).textContent=='')
		document.getElementById('s'+(id+9)).textContent='x';

	  }

}


function ifContains(id,ch)
{
	ch = ch.toUpperCase();
	let e = document.getElementById('s'+id);
	if(e.textContent.toLocaleUpperCase().split('').includes(ch))
	  return true;
	  return false;
}

function checkForEatable(p,i)
{
	let e = document.getElementById('s'+(i) );
	if(p.textContent.split('').includes('W')&&ifContains(i,'B')
	|| p.textContent.split('').includes('B')&&ifContains(i,'W'))
	eatablePeices.push(e);
}

function clearCross(){
	//clear croses
	for(let i =1;i<65;i++)
	if(document.getElementById('s'+i).textContent=='x')
	document.getElementById('s'+i).textContent = '';
}
