import { render, screen, act } from "@testing-library/react";
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

  beforeEach(() => {
    jest.useFakeTimers()
    api.loadData = jest.fn().mockReturnValue(data)
  })

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
  })

  it('displays the second slide after the first and a timeout', async() => {
    render (
      <DataProvider>
        <Slider/>
      </DataProvider>
    )
    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    act(() => {jest.advanceTimersByTime(3000)})
    expect(await screen.findByText('Nordic design week')).toBeInTheDocument()
  })

  it('returns to the first slide after having displayed all the slides', async() => {
    render (
      <DataProvider>
        <Slider/>
      </DataProvider>
    )
    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
    act(() => {jest.advanceTimersByTime(3000)})
    expect(await screen.findByText('Nordic design week')).toBeInTheDocument()
    act(() => {jest.advanceTimersByTime(3000)})
    expect(await screen.findByText('Sneakercraze market')).toBeInTheDocument()
    act(() => {jest.advanceTimersByTime(3000)})
    expect(await screen.findByText('World economic forum')).toBeInTheDocument()
  })



})
