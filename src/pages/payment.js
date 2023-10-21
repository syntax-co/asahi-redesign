
import { 
    Elements, 
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const public_key = 'pk_live_51NMDHPGmgvEnO1v6z9tGBftf9IKGSuIM3q09kuN1BljJPpIjUrIFpSjP9jH6rByFbX0ffZ3W6aE3MME0HavSsVwU009B3qCIpk'
const stripePromise = loadStripe(public_key)

// card ratio 1:1.59

const Payment = () => {

    return(
        <Elements stripe={stripePromise}>
        <div className="payment-body">
            
            <div className="w-full h-2/6 flex items-center justify-center bg-slate-900"

            >

                <div className=" mt-40 rounded-lg bg-slate-600"
                 style={{
                    height:`${200}px`,
                    width:`${200*1.59}px`,
                    backgroundImage:'url(./images/cool-background.svg)',
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat'
                }}
                >

                </div>

            </div>


        </div>
        </Elements>
    )
}


export default Payment;