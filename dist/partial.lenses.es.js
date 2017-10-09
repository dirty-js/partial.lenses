import { acyclicEqualsU, always, applyU, arityN, array0, assocPartialU, constructorOf, curry, curryN, dissocPartialU, freeze, hasU, id, isArray, isDefined, isFunction, isObject, isString, keys, object0, sndU, toObject } from 'infestines';

var dep = function dep(xs2xsyC) {
  return function (xsy) {
    return arityN(xsy.length, function () {
      for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
        xs[_key] = arguments[_key];
      }

      return xs2xsyC(xs)(xsy).apply(undefined, xs);
    });
  };
};

var fn = function fn(xsC, yC) {
  return function (xsy) {
    return arityN(xsy.length, function () {
      for (var _len2 = arguments.length, xs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        xs[_key2] = arguments[_key2];
      }

      return yC(xsy.apply(null, xsC(xs)));
    });
  };
};

var res = function res(yC) {
  return fn(id, yC);
};

var args = function args(xsC) {
  return fn(xsC, id);
};

var nth = function nth(i, xC) {
  return function (xs) {
    var ys = xs.slice(0);
    ys[i] = xC(ys[i]);
    return ys;
  };
};

var par = function par(i, xC) {
  return args(nth(i, xC));
};



var ef = function ef(xE) {
  return function (x) {
    xE(x);
    return x;
  };
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//

var toStringPartial = function toStringPartial(x) {
  return void 0 !== x ? String(x) : "";
};

var lt = function lt(x, y) {
  return x < y;
};
var gt = function gt(x, y) {
  return x > y;
};

var sliceIndex = function sliceIndex(m, l, d, i) {
  return void 0 !== i ? Math.min(Math.max(m, i < 0 ? l + i : i), l) : d;
};

var cpair = function cpair(xs) {
  return function (x) {
    return [x, xs];
  };
};

var unto = function unto(c) {
  return function (x) {
    return void 0 !== x ? x : c;
  };
};
var unto0 = /*#__PURE__*/unto(0);

var notPartial = function notPartial(x) {
  return void 0 !== x ? !x : x;
};

var singletonPartial = function singletonPartial(x) {
  return void 0 !== x ? [x] : void 0;
};

var instanceofObject = function instanceofObject(x) {
  return x instanceof Object;
};

var expect = function expect(p, f) {
  return function (x) {
    return p(x) ? f(x) : void 0;
  };
};

function deepFreeze(x) {
  if (Array.isArray(x)) {
    x.forEach(deepFreeze);
    freeze(x);
  } else if (isObject(x)) {
    for (var k in x) {
      deepFreeze(x[k]);
    }freeze(x);
  }
  return x;
}

function freezeArrayOfObjects(xs) {
  xs.forEach(freeze);
  return freeze(xs);
}

var isArrayOrPrimitive = function isArrayOrPrimitive(x) {
  return !(x instanceof Object) || Array.isArray(x);
};

var rev = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (xs) {
  if (seemsArrayLike(xs)) {
    var n = xs.length,
        ys = Array(n),
        i = 0;
    while (n) {
      ys[i++] = xs[--n];
    }return ys;
  }
});

//

var mapPartialIndexU = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (xi2y, xs) {
  var n = xs.length,
      ys = Array(n);
  var j = 0;
  for (var i = 0, y; i < n; ++i) {
    if (void 0 !== (y = xi2y(xs[i], i))) ys[j++] = y;
  }if (j) {
    if (j < n) ys.length = j;
    return ys;
  }
});

var mapIfArrayLike = function mapIfArrayLike(xi2y, xs) {
  return seemsArrayLike(xs) ? mapPartialIndexU(xi2y, xs) || array0 : void 0;
};

var copyToFrom = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : function (fn$$1) {
  return function (ys, k, xs, i, j) {
    return ys.length === k + j - i ? freeze(fn$$1(ys, k, xs, i, j)) : fn$$1(ys, k, xs, i, j);
  };
})(function (ys, k, xs, i, j) {
  while (i < j) {
    ys[k++] = xs[i++];
  }return ys;
});

//

function selectInArrayLike(xi2v, xs) {
  for (var i = 0, n = xs.length; i < n; ++i) {
    var v = xi2v(xs[i], i);
    if (void 0 !== v) return v;
  }
}

//

var Select = {
  map: sndU,
  of: function of() {},
  ap: function ap(l, r) {
    return void 0 !== l ? l : r;
  }
};

var Ident = { map: applyU, of: id, ap: applyU, chain: applyU };

var Const = { map: sndU };

var ConcatOf = function ConcatOf(ap, empty) {
  return { map: sndU, ap: ap, of: always(empty) };
};

var Sum = /*#__PURE__*/ConcatOf(function (x, y) {
  return x + y;
}, 0);

var mumBy = function mumBy(ord) {
  return curry(function (xi2y, t, s) {
    var minX = void 0,
        minY = void 0;
    traverseU(Select, function (x, i) {
      var y = xi2y(x, i);
      if (void 0 !== y && (void 0 === minY || ord(y, minY))) {
        minX = x;
        minY = y;
      }
    }, t, s);
    return minX;
  });
};

//

var traverseU = function traverseU(C, xi2yC, t, s) {
  return toFunction(t)(s, void 0, C, xi2yC);
};

//

var expectedOptic = "Expecting an optic";
var opticIsEither = "An optic can be either\n- a string,\n- a non-negative integer,\n- a ternary optic function,\n- an ordinary unary or binary function, or\n- an array of optics.\nSee documentation of `toFunction` and `compose` for details.";
var header = "partial.lenses: ";

function warn(f, m) {
  if (!f.warned) {
    f.warned = 1;
    console.warn(header + m);
  }
}

function errorGiven(m, o, e) {
  m = header + m + ".";
  e = e ? "\n" + e : "";
  console.error(m, "Given:", o, e);
  throw Error(m + e);
}

function reqIndex(x) {
  if (!Number.isInteger(x) || x < 0) errorGiven("`index` expects a non-negative integer", x);
}

function reqFunction(o) {
  if (!(isFunction(o) && (o.length === 4 || o.length <= 2))) errorGiven(expectedOptic, o, opticIsEither);
}

function reqArray(o) {
  if (!Array.isArray(o)) errorGiven(expectedOptic, o, opticIsEither);
}

function reqOptic(o) {
  switch (typeof o) {
    case "string":
      break;
    case "number":
      reqIndex(o);break;
    case "object":
      reqArray(o);
      for (var i = 0, n = o.length; i < n; ++i) {
        reqOptic(o[i]);
      }break;
    default:
      reqFunction(o);break;
  }
}

//

var reqString = function reqString(msg) {
  return function (x) {
    if (!isString(x)) errorGiven(msg, x);
  };
};

var reqMaybeArray = function reqMaybeArray(msg) {
  return function (zs) {
    if (!(void 0 === zs || seemsArrayLike(zs))) errorGiven(msg, zs);
  };
};

//

var reqApplicative = function reqApplicative(name, arg) {
  return function (C) {
    if (!C.of) errorGiven("`" + name + (arg ? "(" + arg + ")" : "") + "` requires an applicative", C, "Note that you cannot `get` a traversal. Perhaps you wanted to `collect` it?");
  };
};

var reqMonad = function reqMonad(name) {
  return function (C) {
    if (!C.chain) errorGiven("`" + name + "` requires a monad", C, "Note that you can only `modify`, `remove`, `set`, and `traverse` a transform.");
  };
};

//

var mkTraverse = function mkTraverse(after, toC) {
  return curryN(4, function (xi2yC, m) {
    return m = toC(m), function (t, s) {
      return after(traverseU(m, xi2yC, t, s));
    };
  });
};

//

var cons = function cons(t) {
  return function (h) {
    return void 0 !== h ? [h, t] : t;
  };
};
var consTo = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (n) {
  if (cons !== n) {
    var xs = [];
    do {
      xs.push(n[0]);
      n = n[1];
    } while (cons !== n);
    return xs.reverse();
  }
});

var traversePartialIndex = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqApplicative("elems"))))(function (A, xi2yA, xs) {
  var map = A.map,
      ap = A.ap,
      of = A.of;

  var xsA = of(cons);
  var n = xs.length;
  for (var i = 0; i < n; ++i) {
    xsA = ap(map(cons, xsA), xi2yA(xs[i], i));
  }return map(consTo, xsA);
});

//

function object0ToUndefined(o) {
  if (!(o instanceof Object)) return o;
  for (var k in o) {
    return o;
  }
}

//

var lensFrom = function lensFrom(get, set) {
  return function (i) {
    return function (x, _i, F, xi2yF) {
      return F.map(function (v) {
        return set(i, v, x);
      }, xi2yF(get(i, x), i));
    };
  };
};

//

var getProp = function getProp(k, o) {
  return o instanceof Object ? o[k] : void 0;
};

var setProp = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (k, v, o) {
  return void 0 !== v ? assocPartialU(k, v, o) : dissocPartialU(k, o);
});

var funProp = /*#__PURE__*/lensFrom(getProp, setProp);

//

var getIndex = function getIndex(i, xs) {
  return seemsArrayLike(xs) ? xs[i] : void 0;
};

var setIndex = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : fn(nth(0, ef(reqIndex)), freeze))(function (i, x, xs) {
  if (!seemsArrayLike(xs)) xs = "";
  var n = xs.length;
  if (void 0 !== x) {
    var m = Math.max(i + 1, n),
        ys = Array(m);
    for (var j = 0; j < m; ++j) {
      ys[j] = xs[j];
    }ys[i] = x;
    return ys;
  } else {
    if (0 < n) {
      if (n <= i) return copyToFrom(Array(n), 0, xs, 0, n);
      if (1 < n) {
        var _ys = Array(n - 1);
        for (var _j = 0; _j < i; ++_j) {
          _ys[_j] = xs[_j];
        }for (var _j2 = i + 1; _j2 < n; ++_j2) {
          _ys[_j2 - 1] = xs[_j2];
        }return _ys;
      }
    }
  }
});

var funIndex = /*#__PURE__*/lensFrom(getIndex, setIndex);

//

var composedMiddle = function composedMiddle(o, r) {
  return function (F, xi2yF) {
    var n = r(F, xi2yF);
    return function (x, i) {
      return o(x, i, F, n);
    };
  };
};

function composed(oi0, os) {
  var n = os.length - oi0;
  if (n < 2) {
    return n ? toFunction(os[oi0]) : identity;
  } else {
    var _last = toFunction(os[oi0 + --n]);
    var r = function r(F, xi2yF) {
      return function (x, i) {
        return _last(x, i, F, xi2yF);
      };
    };
    while (--n) {
      r = composedMiddle(toFunction(os[oi0 + n]), r);
    }var first = toFunction(os[oi0]);
    return function (x, i, F, xi2yF) {
      return first(x, i, F, r(F, xi2yF));
    };
  }
}

var setU = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function (o, x, s) {
  switch (typeof o) {
    case "string":
      return setProp(o, x, s);
    case "number":
      return setIndex(o, x, s);
    case "object":
      return modifyComposed(o, 0, s, x);
    default:
      return o.length === 4 ? o(s, void 0, Ident, always(x)) : s;
  }
});

var modifyU = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function (o, xi2x, s) {
  switch (typeof o) {
    case "string":
      return setProp(o, xi2x(getProp(o, s), o), s);
    case "number":
      return setIndex(o, xi2x(getIndex(o, s), o), s);
    case "object":
      return modifyComposed(o, xi2x, s);
    default:
      return o.length === 4 ? o(s, void 0, Ident, xi2x) : (xi2x(o(s, void 0), void 0), s);
  }
});

function makeIx(i) {
  var ix = function ix(s, j) {
    return ix.v = j, s;
  };
  ix.v = i;
  return ix;
}

function getNestedU(l, s, j, ix) {
  for (var n = l.length, o; j < n; ++j) {
    switch (typeof (o = l[j])) {
      case "string":
        s = getProp(ix.v = o, s);
        break;
      case "number":
        s = getIndex(ix.v = o, s);
        break;
      case "object":
        s = getNestedU(o, s, 0, ix);
        break;
      default:
        s = o(s, ix.v, Const, ix);
    }
  }return s;
}

var getU = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function (l, s) {
  switch (typeof l) {
    case "string":
      return getProp(l, s);
    case "number":
      return getIndex(l, s);
    case "object":
      for (var i = 0, n = l.length, o; i < n; ++i) {
        switch (typeof (o = l[i])) {
          case "string":
            s = getProp(o, s);break;
          case "number":
            s = getIndex(o, s);break;
          default:
            return getNestedU(l, s, i, makeIx(l[i - 1]));
        }
      }return s;
    default:
      return l(s, void 0, Const, id);
  }
});

function modifyComposed(os, xi2y, x, y) {
  var n = os.length;
  var xs = Array(n);
  for (var i = 0, o; i < n; ++i) {
    xs[i] = x;
    switch (typeof (o = os[i])) {
      case "string":
        x = getProp(o, x);
        break;
      case "number":
        x = getIndex(o, x);
        break;
      default:
        x = composed(i, os)(x, os[i - 1], Ident, xi2y || always(y));
        n = i;
        break;
    }
  }
  if (n === os.length) x = xi2y ? xi2y(x, os[n - 1]) : y;
  for (var _o; 0 <= --n;) {
    x = isString(_o = os[n]) ? setProp(_o, x, xs[n]) : setIndex(_o, x, xs[n]);
  }return x;
}

//

var lensU = function lensU(get, set) {
  return function (x, i, F, xi2yF) {
    return F.map(function (y) {
      return set(y, x, i);
    }, xi2yF(get(x, i), i));
  };
};

var isoU = function isoU(bwd, fwd) {
  return function (x, i, F, xi2yF) {
    return F.map(fwd, xi2yF(bwd(x), i));
  };
};

//

var getPick = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (template, x) {
  var r = void 0;
  for (var k in template) {
    var t = template[k];
    var v = isObject(t) ? getPick(t, x) : getU(t, x);
    if (void 0 !== v) {
      if (!r) r = {};
      r[k] = v;
    }
  }
  return r;
});

var reqTemplate = function reqTemplate(name) {
  return function (template) {
    if (!isObject(template)) errorGiven("`" + name + "` expects a plain Object template", template);
  };
};

var reqObject = function reqObject(msg) {
  return function (value) {
    if (!(void 0 === value || value instanceof Object)) errorGiven(msg, value);
  };
};

var setPick = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(1, ef(reqObject("`pick` must be set with undefined or an object"))))(function (template, value, x) {
  for (var k in template) {
    var v = value && value[k];
    var t = template[k];
    x = isObject(t) ? setPick(t, v, x) : setU(t, v, x);
  }
  return x;
});

//

var toObject$1 = function toObject$$1(x) {
  return constructorOf(x) !== Object ? toObject(x) : x;
};

//

var mapPartialObjectU = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(freeze))(function (xi2y, o) {
  var r = void 0;
  for (var k in o) {
    var v = xi2y(o[k], k);
    if (void 0 !== v) {
      if (void 0 === r) r = {};
      r[k] = v;
    }
  }
  return r;
});

var branchOnMerge = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(res(freeze)))(function (x, keys$$1) {
  return function (xs) {
    var o = {},
        n = keys$$1.length;
    for (var i = n; i; xs = xs[1]) {
      var v = xs[0];
      o[keys$$1[--i]] = void 0 !== v ? v : o;
    }
    var r = void 0;
    x = toObject$1(x);
    for (var k in x) {
      var _v = o[k];
      if (o !== _v) {
        o[k] = o;
        if (!r) r = {};
        r[k] = void 0 !== _v ? _v : x[k];
      }
    }
    for (var _i2 = 0; _i2 < n; ++_i2) {
      var _k = keys$$1[_i2];
      var _v2 = o[_k];
      if (o !== _v2) {
        if (!r) r = {};
        r[_k] = _v2;
      }
    }
    return r;
  };
});

var branchOn = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : dep(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _keys = _ref2[0],
      vals = _ref2[1];

  return res(par(2, ef(reqApplicative(vals ? "branch" : "values"))));
}))(function (keys$$1, vals) {
  return function (x, _i, A, xi2yA) {
    var of = A.of;

    var n = keys$$1.length;
    if (!n) return of(object0ToUndefined(x));
    if (!(x instanceof Object)) x = object0;
    if (Select === A) {
      for (var i = 0; i < n; ++i) {
        var k = keys$$1[i],
            v = x[k];
        var y = vals ? vals[i](v, k, A, xi2yA) : xi2yA(v, k);
        if (void 0 !== y) return y;
      }
    } else {
      var map = A.map,
          ap = A.ap;

      var xsA = of(cpair);
      for (var _i3 = 0; _i3 < n; ++_i3) {
        var _k2 = keys$$1[_i3],
            _v3 = x[_k2];
        xsA = ap(map(cpair, xsA), vals ? vals[_i3](_v3, _k2, A, xi2yA) : xi2yA(_v3, _k2));
      }
      return map(branchOnMerge(x, keys$$1), xsA);
    }
  };
});

var replaced = function replaced(inn, out, x) {
  return acyclicEqualsU(x, inn) ? out : x;
};

function findIndexHint(hint, xi2b, xs) {
  var u = hint.hint;
  var n = xs.length;
  if (n <= u) u = n - 1;
  if (u < 0) u = 0;
  var d = u - 1;
  for (; 0 <= d && u < n; ++u, --d) {
    if (xi2b(xs[u], u, hint)) return u;
    if (xi2b(xs[d], d, hint)) return d;
  }
  for (; u < n; ++u) {
    if (xi2b(xs[u], u, hint)) return u;
  }for (; 0 <= d; --d) {
    if (xi2b(xs[d], d, hint)) return d;
  }return n;
}

var partitionIntoIndex = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : dep(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 4),
      _xi2b = _ref4[0],
      _xs = _ref4[1],
      ts = _ref4[2],
      fs = _ref4[3];

  return res(ef(function () {
    freeze(ts);freeze(fs);
  }));
}))(function (xi2b, xs, ts, fs) {
  for (var i = 0, n = xs.length, x; i < n; ++i) {
    (xi2b(x = xs[i], i) ? ts : fs).push(x);
  }
});

var fromReader = function fromReader(wi2x) {
  return function (w, i, F, xi2yF) {
    return F.map(always(w), xi2yF(wi2x(w, i), i));
  };
};

//

var reValue = function reValue(m) {
  return m[0];
};
var reIndex = function reIndex(m) {
  return m.index;
};

function reNext(m, re) {
  var lastIndex = re.lastIndex;
  re.lastIndex = reIndex(m) + m[0].length;
  var n = re.exec(m.input);
  re.lastIndex = lastIndex;
  if (n) {
    if (n[0]) return n;
    if (process.env.NODE_ENV !== "production") warn(reNext, "`matches(" + re + ")` traversal terminated at index " + reIndex(n) + " in " + JSON.stringify(n.input) + " due to empty match.");
  }
}

//

var iterCollect = function iterCollect(s) {
  return function (xs) {
    return function (x) {
      return [s, x, xs];
    };
  };
};

var iterToArray = function iterToArray(xs) {
  var ys = [];
  while (iterCollect !== xs) {
    ys.push(xs[0], xs[1]);
    xs = xs[2];
  }
  return ys;
};

function iterSelect(xi2y, t, s) {
  while (s = reNext(s, t)) {
    var y = xi2y(reValue(s), reIndex(s));
    if (void 0 !== y) return y;
  }
}

function iterEager(map, ap, of, xi2yA, t, s) {
  var r = of(iterCollect);
  while (s = reNext(s, t)) {
    r = ap(ap(map(iterCollect, of(s)), r), xi2yA(reValue(s), reIndex(s)));
  }return r;
}

//

var keyed = /*#__PURE__*/isoU(expect(instanceofObject, (process.env.NODE_ENV === "production" ? id : res(freezeArrayOfObjects))(function (x) {
  x = toObject$1(x);
  var es = [];
  for (var key in x) {
    es.push([key, x[key]]);
  }return es;
})), expect(isArray, (process.env.NODE_ENV === "production" ? id : res(freeze))(function (es) {
  var o = void 0;
  for (var i = 0, n = es.length; i < n; ++i) {
    var entry = es[i];
    if (entry.length === 2) {
      if (void 0 === o) o = {};
      o[entry[0]] = entry[1];
    }
  }
  return o;
})));

//

var matchesJoin = function matchesJoin(input) {
  return function (matchesIn) {
    var result = "";
    var lastIndex = 0;
    var matches = iterToArray(matchesIn);
    var n = matches.length;
    for (var j = n - 2; j !== -2; j += -2) {
      var m = matches[j],
          i = reIndex(m);
      result += input.slice(lastIndex, i);
      var s = matches[j + 1];
      if (void 0 !== s) result += s;
      lastIndex = i + m[0].length;
    }

    result += input.slice(lastIndex);
    return result || void 0;
  };
};

//

var identity = function identity(x, i, _F, xi2yF) {
  return xi2yF(x, i);
};

var ifteU = function ifteU(c, t, e) {
  return function (x, i, C, xi2yC) {
    return (c(x, i) ? t : e)(x, i, C, xi2yC);
  };
};

var orElseU = function orElseU(back, prim) {
  return prim = toFunction(prim), back = toFunction(back), function (x, i, C, xi2yC) {
    return (isDefined$1(prim, x) ? prim : back)(x, i, C, xi2yC);
  };
};

function zeroOp(y, i, C, xi2yC, x) {
  var of = C.of;
  return of ? of(y) : C.map(always(y), xi2yC(x, i));
}

//

var pickInAux = function pickInAux(t, k) {
  return [k, pickIn(t)];
};

// Auxiliary

var seemsArrayLike = function seemsArrayLike(x) {
  return x instanceof Object && (x = x.length, x === x >> 0 && 0 <= x) || isString(x);
};

// Internals

var toFunction = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqOptic)))(function (o) {
  switch (typeof o) {
    case "string":
      return funProp(o);
    case "number":
      return funIndex(o);
    case "object":
      return composed(0, o);
    default:
      return o.length === 4 ? o : fromReader(o);
  }
});

// Operations on optics

var assign = /*#__PURE__*/curry(function (o, x, s) {
  return setU([o, propsOf(x)], x, s);
});

var modify = /*#__PURE__*/curry(modifyU);

var remove = /*#__PURE__*/curry(function (o, s) {
  return setU(o, void 0, s);
});

var set = /*#__PURE__*/curry(setU);

var transform = /*#__PURE__*/curry(function (o, s) {
  return modifyU(o, id, s);
});

var traverse = /*#__PURE__*/curry(traverseU);

// Nesting

function compose() {
  var n = arguments.length;
  if (n < 2) {
    return n ? arguments[0] : identity;
  } else {
    var os = Array(n);
    while (n--) {
      os[n] = arguments[n];
    }return os;
  }
}

// Recursing

function lazy(o2o) {
  var _memo = function memo(x, i, C, xi2yC) {
    return (_memo = toFunction(o2o(rec)))(x, i, C, xi2yC);
  };
  function rec(x, i, C, xi2yC) {
    return _memo(x, i, C, xi2yC);
  }
  return rec;
}

// Adapting

var choices = function choices(o) {
  for (var _len = arguments.length, os = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    os[_key - 1] = arguments[_key];
  }

  return os.length ? orElseU(os.reduceRight(orElseU), o) : o;
};

var choose = function choose(xiM2o) {
  return function (x, i, C, xi2yC) {
    return toFunction(xiM2o(x, i))(x, i, C, xi2yC);
  };
};

function iftes(_c, _t) {
  var n = arguments.length;
  var r = toFunction(n & 1 ? arguments[--n] : zero);
  while (0 <= (n -= 2)) {
    r = ifteU(arguments[n], toFunction(arguments[n + 1]), r);
  }return r;
}

var orElse = /*#__PURE__*/curry(orElseU);

// Querying

var chain = /*#__PURE__*/curry(function (xi2yO, xO) {
  return [xO, choose(function (xM, i) {
    return void 0 !== xM ? xi2yO(xM, i) : zero;
  })];
});

var choice = function choice() {
  for (var _len2 = arguments.length, os = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    os[_key2] = arguments[_key2];
  }

  return os.reduceRight(orElseU, zero);
};

var unless = function unless(p) {
  return ifteU(p, zeroOp, identity);
};

var when = function when(p) {
  return ifteU(p, identity, zeroOp);
};

var optional = /*#__PURE__*/when(isDefined);

var zero = function zero(x, i, C, xi2yC) {
  return zeroOp(x, i, C, xi2yC);
};

// Transforming

var assignOp = function assignOp(x) {
  return [propsOf(x), setOp(x)];
};

var modifyOp = function modifyOp(xi2y) {
  return function (x, i, C, xi2yC) {
    return zeroOp(x = xi2y(x, i), i, C, xi2yC, x);
  };
};

var setOp = function setOp(y) {
  return function (_x, i, C, xi2yC) {
    return zeroOp(y, i, C, xi2yC, y);
  };
};

var removeOp = /*#__PURE__*/setOp();

// Debugging

function log() {
  var _arguments = arguments;

  var show = curry(function (dir, x) {
    return console.log.apply(console, copyToFrom([], 0, _arguments, 0, _arguments.length).concat([dir, x])), x;
  });
  return isoU(show("get"), show("set"));
}

// Sequencing

var seq = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : function (fn$$1) {
  return function () {
    return par(2, ef(reqMonad("seq")))(fn$$1.apply(undefined, arguments));
  };
})(function () {
  var n = arguments.length,
      xMs = Array(n);
  for (var i = 0; i < n; ++i) {
    xMs[i] = toFunction(arguments[i]);
  }function loop(M, xi2xM, i, j) {
    return j === n ? M.of : function (x) {
      return M.chain(loop(M, xi2xM, i, j + 1), xMs[j](x, i, M, xi2xM));
    };
  }
  return function (x, i, M, xi2xM) {
    return loop(M, xi2xM, i, 0)(x);
  };
});

// Creating new traversals

var branch = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqTemplate("branch"))))(function (template) {
  var keys$$1 = [],
      vals = [];
  for (var k in template) {
    keys$$1.push(k);
    var t = template[k];
    vals.push(isObject(t) ? branch(t) : toFunction(t));
  }
  return branchOn(keys$$1, vals);
});

// Traversals and combinators

var elems = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(2, ef(reqApplicative("elems"))))(function (xs, _i, A, xi2yA) {
  if (seemsArrayLike(xs)) {
    return A === Ident ? mapPartialIndexU(xi2yA, xs) : A === Select ? selectInArrayLike(xi2yA, xs) : traversePartialIndex(A, xi2yA, xs);
  } else {
    return A.of(xs);
  }
});

var entries = /*#__PURE__*/toFunction([keyed, elems]);

var flatten =
/*#__PURE__*/lazy(function (rec) {
  return iftes(Array.isArray, [elems, rec], identity);
});

var keys$1 = /*#__PURE__*/toFunction([keyed, elems, 0]);

var matches = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : dep(function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 1),
      re = _ref6[0];

  return re.global ? res(par(2, ef(reqApplicative("matches", re)))) : id;
}))(function (re) {
  return function (x, _i, C, xi2yC) {
    if (isString(x)) {
      var map = C.map;

      if (re.global) {
        var m0 = [""];
        m0.input = x;
        m0.index = 0;
        if (Select === C) {
          return iterSelect(xi2yC, re, m0);
        } else {
          var ap = C.ap,
              of = C.of;

          return map(matchesJoin(x), iterEager(map, ap, of, xi2yC, re, m0));
        }
      } else {
        var m = x.match(re);
        if (m) return map(function (y) {
          return x.replace(re, void 0 !== y ? y : "") || void 0;
        }, xi2yC(m[0], reIndex(m)));
      }
    }
    return zeroOp(x, void 0, C, xi2yC);
  };
});

var values = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(2, ef(reqApplicative("values"))))(function (xs, _i, A, xi2yA) {
  if (xs instanceof Object) {
    return A === Ident ? mapPartialObjectU(xi2yA, toObject$1(xs)) : branchOn(keys(xs), void 0)(xs, void 0, A, xi2yA);
  } else {
    return A.of(xs);
  }
});

// Folds over traversals

var all = /*#__PURE__*/curry(function (xi2b, t, s) {
  return !traverseU(Select, function (x, i) {
    if (!xi2b(x, i)) return true;
  }, t, s);
});

var and = /*#__PURE__*/all(id);

var any = /*#__PURE__*/curry(function (xi2b, t, s) {
  return !!traverseU(Select, function (x, i) {
    if (xi2b(x, i)) return true;
  }, t, s);
});

var collectAs = /*#__PURE__*/(process.env.NODE_ENV === "production" ? curry : res(freeze))(function (xi2y, t, s) {
  var results = [];
  traverseU(Select, function (x, i) {
    var y = xi2y(x, i);
    if (void 0 !== y) results.push(y);
  }, t, s);
  return results;
});

var collect = /*#__PURE__*/collectAs(id);

var concatAs =
/*#__PURE__*/mkTraverse(id, function (m) {
  return ConcatOf(m.concat, m.empty());
});

var concat = /*#__PURE__*/concatAs(id);

var countIf = /*#__PURE__*/curry(function (p, t, s) {
  return traverseU(Sum, function (x, i) {
    return p(x, i) ? 1 : 0;
  }, t, s);
});

var count = /*#__PURE__*/countIf(isDefined);

var countsAs = /*#__PURE__*/curry(function (xi2k, t, s) {
  var counts = new Map();
  traverseU(Select, function (x, i) {
    var k = xi2k(x, i),
        n = counts.get(k);
    counts.set(k, void 0 !== n ? n + 1 : 1);
  }, t, s);
  return counts;
});

var counts = /*#__PURE__*/countsAs(id);

var foldl = /*#__PURE__*/curry(function (f, r, t, s) {
  traverseU(Select, function (x, i) {
    r = f(r, x, i);
  }, t, s);
  return r;
});

var foldr = /*#__PURE__*/curry(function (f, r, t, s) {
  var is = [],
      xs = [];
  traverseU(Select, function (x, i) {
    xs.push(x);is.push(i);
  }, t, s);
  for (var i = xs.length - 1; 0 <= i; --i) {
    r = f(r, xs[i], is[i]);
  }return r;
});

var forEach = /*#__PURE__*/curry(function (f, t, s) {
  return traverseU(Select, function (x, i) {
    f(x, i);
  }, t, s);
});

var isDefined$1 = /*#__PURE__*/curry(function (t, s) {
  return void 0 !== traverseU(Select, id, t, s);
});

var isEmpty = /*#__PURE__*/curry(function (t, s) {
  return !traverseU(Select, always(true), t, s);
});

var joinAs = /*#__PURE__*/mkTraverse(toStringPartial, (process.env.NODE_ENV === "production" ? id : par(0, ef(reqString("`join` and `joinAs` expect a string delimiter"))))(function (d) {
  return ConcatOf(function (x, y) {
    return void 0 !== x ? void 0 !== y ? x + d + y : x : y;
  });
}));

var join = /*#__PURE__*/joinAs(id);

var maximumBy = /*#__PURE__*/mumBy(gt);

var maximum = /*#__PURE__*/maximumBy(id);

var meanAs = /*#__PURE__*/curry(function (xi2y, t, s) {
  var sum = 0;
  var num = 0;
  traverseU(Select, function (x, i) {
    var y = xi2y(x, i);
    if (void 0 !== y) {
      num += 1;
      sum += y;
    }
  }, t, s);
  return sum / num;
});

var mean = /*#__PURE__*/meanAs(id);

var minimumBy = /*#__PURE__*/mumBy(lt);

var minimum = /*#__PURE__*/minimumBy(id);

var none = /*#__PURE__*/curry(function (xi2b, t, s) {
  return !traverseU(Select, function (x, i) {
    if (xi2b(x, i)) return true;
  }, t, s);
});

var or = /*#__PURE__*/any(id);

var productAs = /*#__PURE__*/traverse(ConcatOf(function (x, y) {
  return x * y;
}, 1));

var product = /*#__PURE__*/productAs(unto(1));

var selectAs = /*#__PURE__*/traverse(Select);

var select = /*#__PURE__*/selectAs(id);

var sumAs = /*#__PURE__*/traverse(Sum);

var sum = /*#__PURE__*/sumAs(unto0);

// Operations on lenses

function get(l, s) {
  return 1 < arguments.length ? getU(l, s) : function (s) {
    return getU(l, s);
  };
}

// Creating new lenses

var lens = /*#__PURE__*/curry(lensU);

var setter = /*#__PURE__*/lens(id);

var foldTraversalLens = /*#__PURE__*/curry(function (fold, traversal) {
  return lensU(fold(traversal), set(traversal));
});

// Enforcing invariants

function defaults(out) {
  function o2u(x) {
    return replaced(out, void 0, x);
  }
  return function (x, i, F, xi2yF) {
    return F.map(o2u, xi2yF(void 0 !== x ? x : out, i));
  };
}

function define(v) {
  var untoV = unto(v);
  return function (x, i, F, xi2yF) {
    return F.map(untoV, xi2yF(void 0 !== x ? x : v, i));
  };
}

var normalize = function normalize(xi2x) {
  return [reread(xi2x), rewrite(xi2x)];
};

var required = function required(inn) {
  return replace(inn, void 0);
};

var reread = function reread(xi2x) {
  return function (x, i, _F, xi2yF) {
    return xi2yF(void 0 !== x ? xi2x(x, i) : x, i);
  };
};

var rewrite = function rewrite(yi2y) {
  return function (x, i, F, xi2yF) {
    return F.map(function (y) {
      return void 0 !== y ? yi2y(y, i) : y;
    }, xi2yF(x, i));
  };
};

// Lensing arrays

function append(xs, _, F, xi2yF) {
  var i = seemsArrayLike(xs) ? xs.length : 0;
  return F.map(function (x) {
    return setIndex(i, x, xs);
  }, xi2yF(void 0, i));
}

var filter = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(function (lens) {
  return toFunction([lens, isoU(id, ef(reqMaybeArray("`filter` must be set with undefined or an array-like object")))]);
}))(function (xi2b) {
  return function (xs, i, F, xi2yF) {
    var ts = void 0,
        fs = void 0;
    if (seemsArrayLike(xs)) partitionIntoIndex(xi2b, xs, ts = [], fs = []);
    return F.map(function (ts) {
      var tsN = ts ? ts.length : 0,
          fsN = fs ? fs.length : 0,
          n = tsN + fsN;
      if (n) return n === fsN ? fs : copyToFrom(copyToFrom(Array(n), 0, ts, 0, tsN), tsN, fs, 0, fsN);
    }, xi2yF(ts, i));
  };
});

function find(xih2b) {
  var hint = arguments.length > 1 ? arguments[1] : { hint: 0 };
  return function (xs, _i, F, xi2yF) {
    var ys = seemsArrayLike(xs) ? xs : "",
        i = hint.hint = findIndexHint(hint, xih2b, ys);
    return F.map(function (v) {
      return setIndex(i, v, ys);
    }, xi2yF(ys[i], i));
  };
}

var findHint = /*#__PURE__*/(process.env.NODE_ENV === "production" ? curry : res(ef(function () {
  warn(findHint, "`L.findHint` will be removed.  Use `L.find`, which supports an optional hint.");
})))(function (xh2b, hint) {
  return find(function (x, _, h) {
    return xh2b(x, h);
  }, hint);
});

function findWith(o) {
  var oo = toFunction(o),
      p = isDefined$1(oo);
  return [arguments.length > 1 ? find(p, arguments[1]) : find(p), oo];
}

var index = process.env.NODE_ENV !== "production" ? ef(reqIndex) : id;

var last = /*#__PURE__*/choose(function (maybeArray) {
  return seemsArrayLike(maybeArray) && maybeArray.length ? maybeArray.length - 1 : 0;
});

var prefix = function prefix(n) {
  return slice(0, n);
};

var slice = /*#__PURE__*/(process.env.NODE_ENV === "production" ? curry : res(function (lens) {
  return toFunction([lens, isoU(id, ef(reqMaybeArray("`slice` must be set with undefined or an array-like object")))]);
}))(function (begin, end) {
  return function (xs, i, F, xsi2yF) {
    var seems = seemsArrayLike(xs),
        xsN = seems && xs.length,
        b = sliceIndex(0, xsN, 0, begin),
        e = sliceIndex(b, xsN, xsN, end);
    return F.map(function (zs) {
      var zsN = zs ? zs.length : 0,
          bPzsN = b + zsN,
          n = xsN - e + bPzsN;
      return n ? copyToFrom(copyToFrom(copyToFrom(Array(n), 0, xs, 0, b), b, zs, 0, zsN), bPzsN, xs, e, xsN) : void 0;
    }, xsi2yF(seems ? copyToFrom(Array(Math.max(0, e - b)), 0, xs, b, e) : void 0, i));
  };
});

var suffix = function suffix(n) {
  return slice(0 === n ? Infinity : !n ? 0 : -n, void 0);
};

// Lensing objects

var pickIn = function pickIn(t) {
  return isObject(t) ? pick(mapPartialObjectU(pickInAux, t)) : t;
};

var prop = process.env.NODE_ENV === "production" ? id : function (x) {
  if (!isString(x)) errorGiven("`prop` expects a string", x);
  return x;
};

function props() {
  var n = arguments.length,
      template = {};
  for (var i = 0, k; i < n; ++i) {
    template[k = arguments[i]] = k;
  }return pick(template);
}

var propsOf = function propsOf(o) {
  return props.apply(null, keys(o));
};

function removable() {
  for (var _len3 = arguments.length, ps = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    ps[_key3] = arguments[_key3];
  }

  function drop(y) {
    if (!(y instanceof Object)) return y;
    for (var i = 0, n = ps.length; i < n; ++i) {
      if (hasU(ps[i], y)) return y;
    }
  }
  return function (x, i, F, xi2yF) {
    return F.map(drop, xi2yF(x, i));
  };
}

// Providing defaults

var valueOr = function valueOr(v) {
  return function (x, i, _F, xi2yF) {
    return xi2yF(x != null ? x : v, i);
  };
};

// Transforming data

var pick = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : par(0, ef(reqTemplate("pick"))))(function (template) {
  return function (x, i, F, xi2yF) {
    return F.map(function (v) {
      return setPick(template, v, x);
    }, xi2yF(getPick(template, x), i));
  };
});

var replace = /*#__PURE__*/curry(function (inn, out) {
  function o2i(x) {
    return replaced(out, inn, x);
  }
  return function (x, i, F, xi2yF) {
    return F.map(o2i, xi2yF(replaced(inn, out, x), i));
  };
});

// Operations on isomorphisms

function getInverse(o, s) {
  return 1 < arguments.length ? setU(o, s, void 0) : function (s) {
    return setU(o, s, void 0);
  };
}

// Creating new isomorphisms

var iso = /*#__PURE__*/curry(isoU);

// Isomorphism combinators

var array = function array(elem) {
  var fwd = getInverse(elem),
      bwd = get(elem),
      mapFwd = function mapFwd(x) {
    return mapIfArrayLike(fwd, x);
  };
  return function (x, i, F, xi2yF) {
    return F.map(mapFwd, xi2yF(mapIfArrayLike(bwd, x), i));
  };
};

var inverse = function inverse(iso) {
  return function (x, i, F, xi2yF) {
    return F.map(function (x) {
      return getU(iso, x);
    }, xi2yF(setU(iso, x, void 0), i));
  };
};

// Basic isomorphisms

var complement = /*#__PURE__*/isoU(notPartial, notPartial);

var indexed = /*#__PURE__*/isoU(expect(seemsArrayLike, (process.env.NODE_ENV === "production" ? id : res(freezeArrayOfObjects))(function (xs) {
  var n = xs.length,
      xis = Array(n);
  for (var i = 0; i < n; ++i) {
    xis[i] = [i, xs[i]];
  }return xis;
})), expect(isArray, (process.env.NODE_ENV === "production" ? id : res(freeze))(function (xis) {
  var n = xis.length,
      xs = Array(n);
  for (var i = 0; i < n; ++i) {
    var xi = xis[i];
    if (xi.length === 2) xs[xi[0]] = xi[1];
  }
  n = xs.length;
  var j = 0;
  for (var _i4 = 0; _i4 < n; ++_i4) {
    var x = xs[_i4];
    if (void 0 !== x) {
      if (_i4 !== j) xs[j] = x;
      ++j;
    }
  }
  if (j) {
    xs.length = j;
    return xs;
  }
})));

var is = function is(v) {
  return isoU(function (x) {
    return acyclicEqualsU(v, x);
  }, function (b) {
    return true === b ? v : void 0;
  });
};

var reverse = /*#__PURE__*/isoU(rev, rev);

var singleton = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : function (iso) {
  return toFunction([isoU(id, freeze), iso]);
})(function (x, i, F, xi2yF) {
  return F.map(singletonPartial, xi2yF((x instanceof Object || isString(x)) && x.length === 1 ? x[0] : void 0, i));
});

// Standard isomorphisms

var uri =
/*#__PURE__*/isoU(expect(isString, decodeURI), expect(isString, encodeURI));

var uriComponent =
/*#__PURE__*/isoU(expect(isString, decodeURIComponent), expect(isString, encodeURIComponent));

var json = /*#__PURE__*/(process.env.NODE_ENV === "production" ? id : res(function (iso) {
  return toFunction([iso, isoU(deepFreeze, id)]);
}))(function (options) {
  var _ref7 = options || object0,
      reviver = _ref7.reviver,
      replacer = _ref7.replacer,
      space = _ref7.space;

  return isoU(expect(isString, function (text) {
    return JSON.parse(text, reviver);
  }), expect(isDefined, function (value) {
    return JSON.stringify(value, replacer, space);
  }));
});

// Interop

var pointer = function pointer(s) {
  if (s[0] === '#') s = decodeURIComponent(s);
  var ts = s.split('/');
  var n = ts.length;
  for (var i = 1; i < n; ++i) {
    var t = ts[i];
    ts[i - 1] = /^0|[1-9]\d*$/.test(t) ? iftes(isArrayOrPrimitive, Number(t), t) : '-' === t ? iftes(isArrayOrPrimitive, append, t) : t.replace('~1', '/').replace('~0', '~');
  }
  ts.length = n - 1;
  return ts;
};

export { seemsArrayLike, toFunction, assign, modify, remove, set, transform, traverse, compose, lazy, choices, choose, iftes, orElse, chain, choice, unless, when, optional, zero, assignOp, modifyOp, setOp, removeOp, log, seq, branch, elems, entries, flatten, keys$1 as keys, matches, values, all, and, any, collectAs, collect, concatAs, concat, countIf, count, countsAs, counts, foldl, foldr, forEach, isDefined$1 as isDefined, isEmpty, joinAs, join, maximumBy, maximum, meanAs, mean, minimumBy, minimum, none, or, productAs, product, selectAs, select, sumAs, sum, get, lens, setter, foldTraversalLens, defaults, define, normalize, required, reread, rewrite, append, filter, find, findHint, findWith, index, last, prefix, slice, suffix, pickIn, prop, props, propsOf, removable, valueOr, pick, replace, getInverse, iso, array, inverse, complement, identity, indexed, is, keyed, reverse, singleton, uri, uriComponent, json, pointer };
