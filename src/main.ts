import * as ds from "@devicescript/core"
import { debounceTime, filter } from "@devicescript/observables"

const sensor = new ds.AirPressure()
const mouse = new ds.HidMouse()
// listen for pressure changes
sensor.reading
    .pipe(
        filter(pressure => pressure > 1400),
        debounceTime(500)
    )
    .subscribe(async () => {
        console.log(`click!`)
        await mouse.setButton(
            ds.HidMouseButton.Left,
            ds.HidMouseButtonEvent.Click
        )
    })