import { ShopService } from './../shop.service';
import { IProduct } from 'src/app/shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private breadService: BreadcrumbService
  ) {
    this.breadService.set('@productDetails','');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (product) => {
          this.product = product;
          this.breadService.set('@productDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
