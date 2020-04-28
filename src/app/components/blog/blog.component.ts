import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  private entradas: string;

  constructor(
     private _serviceBlog : BlogService
  ) { }

  ngOnInit() {
      this.getEntradas();
  }

  getEntradas(){
      this._serviceBlog.getBlog().subscribe(
        response => {
          this.entradas = response.entrada;
          
        },
        error => {
          console.log(error);
        }
      )
  }


}
