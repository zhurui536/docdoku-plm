/*
 * DocDoku, Professional Open Source
 * Copyright 2006, 2007, 2008, 2009, 2010 DocDoku SARL
 *
 * This file is part of DocDoku.
 *
 * DocDoku is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DocDoku is distributed in the hope that it will be useful,  
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
 * GNU General Public License for more details.  
 *  
 * You should have received a copy of the GNU General Public License  
 * along with DocDoku.  If not, see <http://www.gnu.org/licenses/>.  
 */

package com.docdoku.core.entities;

import javax.persistence.Entity;

/**
 * Defines a text type custom attribute of a document.
 * 
 * @author Florent GARIN
 * @version 1.0, 02/06/08
 * @since   V1.0
 */
@Entity
public class InstanceTextAttribute extends InstanceAttribute{

    

    private String textValue;
    
    public InstanceTextAttribute() {
    }
    
    public InstanceTextAttribute(Document pDoc, String pName, String pValue) {
        super(pDoc, pName);
        setTextValue(pValue);
    }

    @Override
    public String getValue() {
        return textValue;
    }

    public String getTextValue() {
        return textValue;
    }

    public void setTextValue(String textValue) {
        this.textValue = textValue;
        attributeValue = textValue;
    }

    @Override
    public boolean setValue(Object pValue) {
        textValue=pValue + "";
        attributeValue=textValue;
        return true;
    }

}
