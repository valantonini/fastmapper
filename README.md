# fastmapper

[![Build Status](https://travis-ci.org/valantonini/fastmapper.svg?branch=master)](https://travis-ci.org/valantonini/fastmapper)

A no config, lightweight JS object mapper to map api responses to local viewmodels with comprehensive test coverage.


```javascript
class ChildSource {
    prop = "";
    constructor(val: any){
        this.prop = val;
    }
}

class ChildDestination {
    prop = "";
    constructor(val?: any){
        this.prop = val;
    }
}

const source = {
    prop: new ChildSource("source"),
};

const destination = {
    prop: undefined,
};

new FastMapper()
    .withConversion(ChildSource, ChildDestination)
    .map(source, destination);
```

Result:

```javascript
const destination = {
    prop = new ChildDestination("source");
}
```