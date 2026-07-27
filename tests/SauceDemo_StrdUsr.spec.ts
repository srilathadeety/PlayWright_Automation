import {test,expect} from '@playwright/test';


//fixure - eg - page,browser - global variable.

test('Verify title',async ({page})=>{

    await page.goto('https://demoqa.com/');
    let pagetitle = await page.title();
    console.log(pagetitle);
    expect(pagetitle).toBe('demosite');
    
});
