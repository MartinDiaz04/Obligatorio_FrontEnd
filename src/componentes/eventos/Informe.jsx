import PañalesCambiados from './PañalesCambiados'
import BiberonesConsumidos from './BiberonesConsumidos'

const Informe = () => {
    return (
        <div className='col-12 d-flex justify-content-center'>
            <div className="col-6 d-flex justify-content-center mx-3">
                <BiberonesConsumidos />
            </div>
            <div className="col-6 d-flex justify-content-center mx-3">
                <PañalesCambiados />
            </div>
        </div>

    )
}

export default Informe
