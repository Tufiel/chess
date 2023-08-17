let previousPeice;
let turn;

turnSelector();

function turnSelector()
{
	turn = Math.floor(Math.random()*3);
	switchTurn();

}

function showMoves(p)
{
    //Turn control
    if(turn == 1 && p.textContent.toUpperCase().split('').includes('W') )
	  return;
	else if(turn == 2 && p.textContent.toUpperCase().split('').includes('B'))
	    return;
	let moved = false;
	if(p.textContent == 'x')
      {
		p.textContent = previousPeice.textContent;
		previousPeice.textContent = '';
		moved = true;
		if(turn == 1)
		 turn = 2;
		 else
		 turn = 1;
	  }
	  previousPeice = p;

	const id = Number(p.id.slice(1,p.id.length));
	for(let i =1;i<65;i++)
	   if(document.getElementById('s'+i).textContent=='x')
	   document.getElementById('s'+i).textContent = '';
	//id number
    
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
		if(id>getLeftEdge(id))
		{
       for(i =id;i>getLeftEdge(id)&&document.getElementById('s'+(i-1)).textContent=='';i--) 
	   document.getElementById('s'+(i-1)).textContent = 'x';
		
	   }
	   //right
		if(id<getRightEdge(id))
		for(i =id;i<getRightEdge(id)&&document.getElementById('s'+(i+1)).textContent=='';i++) 
		document.getElementById('s'+(i+1)).textContent = 'x';

		//Highlight right peice if it can be eated by tank
		if(i<getRightEdge(id))
	     if( (p.textContent.split('').includes('W') &&
		  document.getElementById('s'+(i+1)).textContent.split('').includes('B'))
		  || (p.textContent.split('').includes('B') &&
		  document.getElementById('s'+(i+1)).textContent.split('').includes('W')) )
	       highlight(i+1);

		//bottom
		for(i =id;i+8<65&&document.getElementById('s'+(i+8)).textContent=='';i+=8) 
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
		for(i = id;i> getLeftEdge(i) && i>8 && document.getElementById('s'+(i-9)).textContent=='';i -=9 )
		document.getElementById('s'+(i-9)).textContent='x';

		//Top Right
		for(i = id;i<getRightEdge(i) && i>8 && document.getElementById('s'+(i-7)).textContent=='';i -=7 )
		document.getElementById('s'+(i-7)).textContent='x';		

		//Down Left
		for(i = id+7;i<65 && document.getElementById('s'+i).textContent=='';i +=7 )
		document.getElementById('s'+i).textContent='x';		

		//Down Right
		for(i = id+9;i<65 && document.getElementById('s'+i).textContent=='';i +=9 )
		document.getElementById('s'+i).textContent='x';
		
	  }

	  //Horse
	  if(p.textContent.toUpperCase() == 'WH' || p.textContent.toUpperCase() == 'BH'  )
	  {
		
		// Top left
		if( id-10>0 && id-17>0 && document.getElementById('s'+(id-17)).textContent=='')
		document.getElementById('s'+(id-17)).textContent='x';

		// Top Right
		if( id-15>0 && id-15>0 && document.getElementById('s'+(id-15)).textContent=='')
		document.getElementById('s'+(id-15)).textContent='x';

		// Bottom Right
		if( id-17<65 && id+17<65 && document.getElementById('s'+(id+17)).textContent=='')
		document.getElementById('s'+(id+17)).textContent='x';

		// Bottom Left
		if( id+15 < 65 && id+15<65 && document.getElementById('s'+(id+15)).textContent=='')
		document.getElementById('s'+(id+15)).textContent='x';
		
		//Left Up
		if( id-10>0 && id-10>=getLeftEdge(id-8) && document.getElementById('s'+(id-10)).textContent=='')
		document.getElementById('s'+(id-10)).textContent='x';

		//Left Down
		if( id+6<65 && id+6>=getLeftEdge(id+8) && document.getElementById('s'+(id+6)).textContent=='')
		document.getElementById('s'+(id+6)).textContent='x';

		//Right Up
		if( id-6>0 && id-6<=getRightEdge(id-8) && document.getElementById('s'+(id-6)).textContent=='')
		document.getElementById('s'+(id-6)).textContent='x';

		//Right Down
		if( id+10<65 && id+10<=getRightEdge(id+8) && document.getElementById('s'+(id+10)).textContent=='')
		document.getElementById('s'+(id+10)).textContent='x';

	  }

	  //Queen
	  if(p.textContent.toUpperCase() == 'WQ' || p.textContent.toUpperCase() == 'BQ'  )
	  {
		//Crosser's Code

		//Top left
		for(let i = id-7;i>0 && document.getElementById('s'+i).textContent=='';i -=7 )
		document.getElementById('s'+i).textContent='x';

		//Top Right
		for(let i = id-9;i>0 && document.getElementById('s'+i).textContent=='';i -=9 )
		document.getElementById('s'+i).textContent='x';

		//Down Left
		for(let i = id+7;i<65 && document.getElementById('s'+i).textContent=='';i +=7 )
		document.getElementById('s'+i).textContent='x';

		//Down Right
		for(let i = id+9;i<65 && document.getElementById('s'+i).textContent=='';i +=9 )
		document.getElementById('s'+i).textContent='x';

		//Tank's Code

		//left
		if(id>getLeftEdge(id))
       for(let i =id;i>getLeftEdge(id)&&document.getElementById('s'+(i-1)).textContent=='';i--) 
	   document.getElementById('s'+(i-1)).textContent = 'x';
	
	   //right
		if(id<getRightEdge(id))
		for(let i =id;i<getRightEdge(id)&&document.getElementById('s'+(i+1)).textContent=='';i++) 
		document.getElementById('s'+(i+1)).textContent = 'x';

		//bottom
		for(let i =id;i+8<65&&document.getElementById('s'+(i+8)).textContent=='';i+=8) 
		  	document.getElementById('s'+(i+8)).textContent = 'x';
			
		//top
		for(let i =id;i>8&&document.getElementById('s'+(i-8)).textContent=='';i-=8) 
			document.getElementById('s'+(i-8)).textContent = 'x';
	  }

	  //King
	  if(p.textContent.toUpperCase() == 'WK' || p.textContent.toUpperCase() == 'BK'  )
	  {
		//Up
		if(id-8>0 && document.getElementById('s'+(id-8)).textContent=='' )
		document.getElementById('s'+(id-8)).textContent='x';

		//Down
		if(id+8<65 && document.getElementById('s'+(id+8)).textContent=='')
		document.getElementById('s'+(id+8)).textContent='x';

		//Left
		if(id-1>=getLeftEdge(id) && document.getElementById('s'+(id-1)).textContent=='')
		document.getElementById('s'+(id-1)).textContent='x';

		//Right
		if(id+1<getRightEdge(id) && document.getElementById('s'+(id+1)).textContent=='')
		document.getElementById('s'+(id+1)).textContent='x';

		//Up Left
		if(id-9>0 && id-9>=getLeftEdge(id-8)&&document.getElementById('s'+(id-9)).textContent=='')
		document.getElementById('s'+(id-9)).textContent='x';

		//Up Right
		if(id-7>0 && id-7<=getRightEdge(id-8)&&document.getElementById('s'+(id-7)).textContent=='')
		document.getElementById('s'+(id-7)).textContent='x';

		//Down Left
		if(id+7<65 && id+7>=getLeftEdge(id+8)&&document.getElementById('s'+(id+7)).textContent=='')
		document.getElementById('s'+(id+7)).textContent='x';

		//Down Right
		if(id+9<65 && id+9<=getRightEdge(id+8)&&document.getElementById('s'+(id+9)).textContent=='')
		document.getElementById('s'+(id+9)).textContent='x';

	  }

	  //Turn Switch
	  switchTurn();


	//   EATING  BY BLACK PAWN
	

	  if(moved)
	  for(let i =1;i<65;i++)
	   if(document.getElementById('s'+i).textContent=='x')
	   document.getElementById('s'+i).textContent = '';

}

function getLeftEdge(n)
{
	for(;n%8 != 0;n++);
	return n-7;
}

function getRightEdge(n)
{
	if(n%8==0)
	 --n;
	for(;n%8 != 0;n--);
	return n+8;
}

function switchTurn()
{
	if(turn == 1)
	  {
		document.getElementById('secondPlayer').style.display = 'unset';
		document.getElementById('firstPlayer').style.display = 'none';
	  }
	  else
	  {
		document.getElementById('firstPlayer').style.display = 'unset';
		document.getElementById('secondPlayer').style.display = 'none';
	  }
	  
}

//Highlight Square in danger
function highlight(sqr)
{
	sqr = 's'+sqr;
      
	  eatable.push(sqr);
}

function ifContains(id,ch)
{
	let e = document.getElementById('s'+id);
	if(e.textContent.toLocaleUpperCase().split('').includes(ch))
	  return true;
	  return false;
}

