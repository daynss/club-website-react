import React, { useState } from "react";
import Button from "../BasicComponents/Button/Button";
import LinkButton from "../BasicComponents/LinkButton/LinkButton";
import { connect } from "react-redux";
import { clearCart } from "../../redux/Cart/cartActions";

const Checkout = ({ clearCart }) => {
  const [checked, setChecked] = useState(false);
  const [toggleTermsDisplay, setToggleTermsDisplay] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handlePurchase = () => {
    if (!checked) {
      setShowWarning(true);
    } else {
      setPurchaseCompleted(true);
      clearCart();
    }
  };

  return (
    <div className="checkout">
      {purchaseCompleted && (
        <div className="checkout-purchase-completed">
          <h3>Thank you for purchase!</h3>

          <LinkButton
            label="Back to program outline"
            href={`/program`}
            iconLeft={true}
          />
        </div>
      )}
      {!purchaseCompleted && (
        <>
          {showWarning && (
            <div className="checkout-warning">
              <span>You must agree with the terms and conditions</span>
            </div>
          )}

          <div className="checkout-checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={checked}
              onChange={() => {
                setChecked((checked) => !checked);
              }}
            />
            <label htmlFor="checkbox">
              I agree to{" "}
              <Button
                label="the terms and conditions"
                kind="ghost"
                onClick={() =>
                  setToggleTermsDisplay(
                    (toggleTermsDisplay) => !toggleTermsDisplay
                  )
                }
              />
              .
            </label>
          </div>
          <div className="checkout-purchase-button">
            <Button label="Purchase tickets" onClick={() => handlePurchase()} />
          </div>
          {toggleTermsDisplay && (
            <div className="terms-conditions-section">
              <h3>TERMS AND CONDITIONS</h3>
              <p>Please, read these carefully.</p>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  dictum vulputate risus, a mattis nibh. Sed quis odio vitae
                  libero molestie vehicula. Donec nibh erat, fringilla et odio
                  ac, interdum aliquet nisi. Vivamus elementum in ipsum nec
                  tincidunt. Fusce aliquam est enim, imperdiet laoreet arcu
                  mattis in. Praesent pretium congue aliquam. Maecenas ornare
                  velit non nunc efficitur condimentum. Sed congue a ipsum quis
                  pulvinar. Cras id pulvinar ante, eu rhoncus magna. Aenean
                  ultricies turpis ut est laoreet pellentesque lacinia eget
                  massa. Maecenas eleifend, nulla et volutpat porttitor, diam
                  leo pharetra elit, ac blandit erat purus ut nulla. Cras risus
                  libero, finibus nec felis ac, vehicula porta turpis. Sed id
                  felis a nunc tincidunt sodales vel ac dui. Donec ultrices vel
                  leo eget tristique. Nunc rhoncus augue in massa congue
                  consectetur. Curabitur posuere dolor eu tempus faucibus. Etiam
                  tincidunt ut ex non placerat. Nunc imperdiet aliquet lacinia.
                  Proin ut euismod quam, vitae rutrum odio.
                </p>
                <p>
                  Praesent blandit volutpat sem vitae laoreet. Cras porttitor
                  tortor eget nisl volutpat, non posuere dolor maximus. Ut mi
                  leo, ultricies sit amet sodales id, elementum ac sapien. Etiam
                  convallis lobortis neque vel fermentum. Integer tincidunt
                  posuere orci, in mattis metus rutrum vitae. Curabitur arcu
                  erat, tempus et scelerisque a, ullamcorper ac turpis. Aliquam
                  pulvinar mattis nulla, at porttitor sapien facilisis ac. Morbi
                  volutpat mauris eu convallis dignissim. Suspendisse viverra
                  velit in varius imperdiet. Morbi euismod metus ac ex tempus
                  pharetra. Duis et diam dui. Quisque rhoncus nisi mauris, nec
                  lacinia felis sodales vitae. Pellentesque mi sem, mattis eget
                  mi eget, ullamcorper gravida nisl. Nam sapien diam, elementum
                  sed nisl sit amet, vulputate tristique tellus. Sed accumsan mi
                  vitae dui scelerisque facilisis. Curabitur dui lectus,
                  faucibus at convallis in, vulputate nec nibh.{" "}
                </p>
                <p>
                  {" "}
                  Mauris id interdum dui. Sed lorem nibh, iaculis id pulvinar a,
                  congue quis augue. Duis malesuada euismod tortor vel
                  venenatis. Class aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos. In faucibus ac arcu
                  non hendrerit. Vestibulum dapibus mattis felis, sed maximus
                  augue blandit in. In hac habitasse platea dictumst. Nullam
                  varius vulputate scelerisque. Pellentesque at blandit augue.
                  Sed viverra, lacus ut sollicitudin tempor, orci elit viverra
                  dolor, non tempor est eros non sapien. Morbi volutpat nunc ac
                  ligula hendrerit, at facilisis turpis cursus. Duis facilisis
                  sapien sit amet turpis tempor accumsan. Nam vitae arcu libero.
                  Proin eu fringilla ante. Pellentesque a sollicitudin nulla.
                </p>
                <p>
                  {" "}
                  Nunc finibus non velit sed scelerisque. Sed suscipit erat sed
                  sem dictum aliquet. In non dolor rutrum, commodo felis in,
                  tempor erat. Fusce sit amet augue id ante luctus iaculis non
                  ac tortor. Nullam mollis, ex efficitur pellentesque viverra,
                  nunc ipsum pulvinar neque, vel hendrerit eros dui et nibh.
                  Integer in velit turpis. Aenean viverra fringilla accumsan.
                  Fusce in ullamcorper orci. Pellentesque sed tortor purus.
                  Praesent non massa tortor. Donec efficitur, nulla ut dictum
                  varius, velit dolor blandit felis, quis blandit nibh mi a
                  nibh. Mauris placerat tortor vitae lacus condimentum cursus.{" "}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(Checkout);
