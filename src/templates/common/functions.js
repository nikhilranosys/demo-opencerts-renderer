export const getDegreeFontSize = degreeText => {
    let stringLength = degreeText.length;

    if(stringLength <= 40)
    {
        return 35;
    }
    else if(stringLength > 40 && stringLength <= 60)
    {
        return 32;
    }
    return 30;
};

export const getNameFontSize = longName => {
    let stringLength = longName.length;

    if(stringLength <= 45)
    {
        return "35";
    }
    else if(stringLength > 45 && stringLength <= 58)
    {
        return 30;
    }
    else if(stringLength > 58 && stringLength <= 70)
    {
        return 25;
    }
    else if(stringLength > 70 && stringLength <= 85)
    {
        return 20;
    }
    return 15;
};