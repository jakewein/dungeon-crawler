#pragma strict

public var ehealth: float = 25.0;
public var espeed: float = 1.0;
public var edefense: float = 5.0;
public var eattack: float = 10.0;
private var animator: Animator;


public var heroscript: Hero;

heroscript = GetComponent.<Hero>();


function Start () {
	animator = GameObject.Find("Enemy").GetComponent.<Animator>();

}

function Update()
                      {
        if( ehealth < 0){
		ehealth = (0);
		}
		animator.SetInteger("enemy value", heroscript.level);
	}