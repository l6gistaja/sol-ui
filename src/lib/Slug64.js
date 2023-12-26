const Slug64 = {

    // Useful functions

    uuidToSlug64: function(uuid) {
        return Slug64.trimLeftByChar(Slug64.hexToSlug64(Slug64.uuidToHex(uuid)),'-');
    },

    intToSlug64: function(int) {
        return Slug64.trimLeftByChar(Slug64.hexToSlug64(int.toString(16)),'-');
    },

    slug64ToInt: function(slug64) {
        return parseInt(Slug64.trimLeftByChar(Slug64.slug64ToHex(slug64), '0'), 16)
    },

    // Workhorses

    trimLeftByChar: function(str, char) {
        var cut = 0;
        for(var i = 0; i < str.length - 1; i++) {
            if(str.charAt(i) != char){ break; }
            cut = i + 1;
        }
        return cut ? str.substr(cut) : str;
    },

    slug64CharToInt: function(char) {
        if('-' == char) { return 0; }
        if('.' == char) { return 1; }
        var code = char.charCodeAt(0);
        if(code > 47 && code < 58) { return code - 46; } // 2 ... 11
        if(code > 64 && code < 91) { return code - 53; } // 12 ... 37
        if(code > 96 && code < 123) { return code - 59; } // 38 ... 63
        return -1;
    },

    uuidToHex: function(uuid) {
        return uuid.substr(0,8) 
            + uuid.substr(9,4) 
            + uuid.substr(14,4) 
            + uuid.substr(19,4)
            + uuid.substr(24);
    },

    hexToUuid: function(hex) {
        var l = hex.length;
        if(l > 32) { 
            hex = hex.substr(l - 32);
        } else if(l < 32) {
            for(var i = 0; i < 32 -l; i++) { hex = '0' + hex; }
        }
        return hex.substr(0,8)
            + '-' + hex.substr(8,4) 
            + '-' + hex.substr(12,4) 
            + '-' + hex.substr(16,4)
            + '-' + hex.substr(20);
    },

    hexToSlug64: function(hex) {
        var slugTable = '-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var deficiency = 3 - hex.length % 3;
        for(var i = 0; i < deficiency; i++) { hex = '0' + hex; }
        var y = '';
        for(var i = 0; i < hex.length; i += 3) {
            var v = parseInt(hex.substr(i,3),16);
            y += slugTable.charAt(v >> 6) + slugTable.charAt(v % 64);
        }
        return y;
    },

    slug64ToHex: function(slug64) {
        if(slug64.length % 2) { slug64 = '-' + slug64; }
        var y = '';
        var tripletVal = 0;
        var triplet = '';
        for(var i = 0; i < slug64.length; i += 2) {
            tripletVal = (Slug64.slug64CharToInt(slug64.charAt(i)) << 6) + Slug64.slug64CharToInt(slug64.charAt(i + 1));
            triplet = '';
            for(var j = 0; j < 3; j++) {
                triplet = (tripletVal % 16).toString(16) + triplet;
                tripletVal = tripletVal >> 4;
            }
            y += triplet; 
        }
        return y;
    }

}

export default Slug64