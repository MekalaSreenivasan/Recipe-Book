import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.open') isOpen = false;  //Binded to the class property of the element
    /*@HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }*/

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elementRef: ElementRef) {
        
    }

    ngOnInit(): void {
        
    }
}