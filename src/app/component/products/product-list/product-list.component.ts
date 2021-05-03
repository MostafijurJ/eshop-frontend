import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {IProduct} from '../../../interface/IProduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productResponse: IProduct[] = [];

  categoryId: string = 'cc92b736-a726-11eb-bbd2-74d83e98005d';

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getData();
    });
  }


  getData() {
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId) {
      //this.categoryId = this.route.snapshot.paramMap.get('id');
      this.categoryId = 'cc92b736-a726-11eb-bbd2-74d83e98005d';
    }else {
      this.categoryId = 'cc92b736-a726-11eb-bbd2-74d83e98005d';
    }
    this.productService.getProductsData(this.categoryId).subscribe(
      responses => {
        this.productResponse = responses;
        console.log(this.productResponse);
      }
    );
  }
}
