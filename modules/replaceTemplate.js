module.exports = (template, product) => {
    let output = template.replaceAll("{%PRODUCT_NAME%}", product?.productName);
    output = output.replaceAll("{%IMAGE%}", product?.image);
    output = output.replaceAll("{%PRICE%}", product?.price);
    output = output.replaceAll("{%QUANTITY%}", product?.quantity);
    output = output.replaceAll("{%FROM%}", product?.from);
    output = output.replaceAll("{%PRODUCT_DESCRIPTION%}", product?.description);
    output = output.replaceAll("{%NUTRIENTS%}", product?.nutrients);
    output = output.replaceAll("{%PRODUCT_ID%}", product?.id);
    output = !product?.organic
      ? output.replaceAll("{%NOT_ORGANIC%}", "not-organic")
      : output;
  
    return output;
  };
  