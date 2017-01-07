#pragma strict

 var barDisplay : float = 0;
 var pos : Vector2 = new Vector2(110,190);
 var size : Vector2 = new Vector2(100,15);
 var progressBarEmpty : Texture2D;
 var progressBarFull : Texture2D;

  public var heroscript: Hero;




function Start () {
	 heroscript = GetComponent.<Hero>();

}

function OnGUI()
 {
 
     // draw the bar's background:
     GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
         GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);
 
         // draw the filled-in part:
         GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
         GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
         GUI.EndGroup ();
 
     GUI.EndGroup ();
 
 } 
 
 function Update()
 {
     // for this example, the bar display is linked to the current time,
     // however you would set this value based on your desired display
     // eg, the loading progress, the player's health, or whatever.
     barDisplay = ((heroscript.health) / ( 25 + (heroscript.level * 5)));
 }
