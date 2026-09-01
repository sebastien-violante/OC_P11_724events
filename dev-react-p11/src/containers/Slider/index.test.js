import { render, screen } from "@testing-library/react";
import { act } from "react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  "focus": [
        {
            "title": "World economic forum",
            "description": "Oeuvre à la coopération entre le secteur public et le privé.",
            "date": "2022-01-29T20:28:45.744Z",
            "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
        },
        {
            "title": "Nordic design week",
            "description": "Conférences sur le design de demain dans le digital",
            "date": "2022-03-29T20:28:45.744Z",
            "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
        },
        {
            "title": "Sneakercraze market",
            "description": "Rencontres de spécialistes des Sneakers Européens.",
            "date": "2022-05-29T20:28:45.744Z",
            "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
        }
    ]
};


describe('When slider is created', () => {
  // exécuté avant chaque test 
  beforeEach(() => {
    // remplacement des timers par des fakers
    jest.useFakeTimers()
    // utilisation de loadData = utilisation des data de mock définies en début de fichier
    api.loadData = jest.fn().mockReturnValue(data)
  })

  // après chaque test : nettoyage des fakers et données
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('displays the first slide', async() => {
    render (
      <DataProvider>
        <Slider/>
      </DataProvider>
    )

    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    // détermination des radios seulement après le render et que le premier texte soit trouvé
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
  })

  it('displays the second slide after the first and a timeout', async() => {
    render (
      <DataProvider>
        <Slider/>
      </DataProvider>
    )
    
    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
    act(() => {jest.advanceTimersByTime(5000)})
    expect(await screen.findByText('Nordic design week')).toBeInTheDocument()
    expect(radios[1]).toBeChecked()
  })

  it('returns to the first slide after having displayed all the slides', async() => {
    render (
      <DataProvider>
        <Slider/>
      </DataProvider>
    )

    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
    act(() => {jest.advanceTimersByTime(5000)})
    expect(await screen.findByText('Nordic design week')).toBeInTheDocument()
    expect(radios[1]).toBeChecked()
    act(() => {jest.advanceTimersByTime(5000)})
    expect(await screen.findByText('Sneakercraze market')).toBeInTheDocument()
    expect(radios[2]).toBeChecked()
    act(() => {jest.advanceTimersByTime(5000)})
    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    expect(radios[0]).toBeChecked()
  })

})
