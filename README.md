# React LRUD

![maintenance-status](https://img.shields.io/badge/maintenance-deprecated-red.svg)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Official React bindings for [Lrud](https://github.com/bbc/lrud)

## :nut_and_bolt: Deprecation notice 27/06/2023 :nut_and_bolt:
Today we are announcing the deprecation of *React LRUD*. This will allow us to concentrate on future work.  A new library called [LRUD Spatial](https://github.com/bbc/lrud-spatial) is now available to the Open Source community.

As part of the deprecation, pull requests will be disabled and outstanding issues will be closed. React LRUD will not be actively maintained.

If you have any questions, you can contact us via email at: [tvopensource@bbc.co.uk](mailto:tvopensource@bbc.co.uk). We aim to respond to emails within a week.

## Install

`npm install react-lrud`

All usage of `react-lrud` also currently relies on [Lrud](https://github.com/bbc/lrud) V2.

`npm install lrud@2.7.1`

We hope to upgrade React LRUD to work with LRUD V3 in the near future.

## Usage

Primary use of React LRUD is to wrap components via the `withNavigation` function,
and then wrapping those components in a `NavigationProvider`

```js
import { withNavigation } from 'react-lrud'
import { BaseButton } from 'third-party-library'

const Button = withNavigation(BaseButton);

export default Button;
```

In the above example, the `Button` will now be picked up inside an LRUD navigation tree when rendered inside
a `NavigationProvider`

e.g

```js
import { withNavigation } from 'react-lrud'
import Lrud from 'lrud'
import { Button } from 'my-library' // the same button from the previous example

render() {
    const navigation = new Lrud();
    return <NavigationProvider navigation={navigation}>
        <Button>OK</Button>
        <Button>Cancel</Button>
    </NavigationProvider>
}
```

Now, `navigation.nodes` will contain entries for the 2 `Button`s.

# License


React LRUD is part of the BBC TAL libraries, and available to everyone under the terms of the Apache 2 open source licence (Apache-2.0). Take a look at the LICENSE file in the code.

Copyright (c) 2018 BBC
