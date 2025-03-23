import { Component, Input } from '@angular/core';
import { PrimitiveProduct } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: PrimitiveProduct;

  getProductDetailsURL() {
    console.log(this.product);
    return `/produkty/${this.product.name}-${this.product.createdAt.replaceAll(
      '-',
      ''
    )}`;
  }
}
