/*
 * DocDoku, Professional Open Source
 * Copyright 2006 - 2017 DocDoku SARL
 *
 * This file is part of DocDokuPLM.
 *
 * DocDokuPLM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DocDokuPLM is distributed in the hope that it will be useful,  
 * but WITHOUT ANY WARRANTY; without even the implied warranty of  
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  
 * GNU Affero General Public License for more details.  
 *  
 * You should have received a copy of the GNU Affero General Public License  
 * along with DocDokuPLM.  If not, see <http://www.gnu.org/licenses/>.  
 */

package com.docdoku.core.product;

import java.io.Serializable;

/**
 * Identity class of {@link ConfigurationItem} objects.
 * objects.
 * 
 * @author Florent Garin
 */
public class ConfigurationItemKey implements Serializable {
    
    private String workspace;
    private String id;
    
    public ConfigurationItemKey() {
    }
    
    public ConfigurationItemKey(String pWorkspaceId, String pId) {
        workspace=pWorkspaceId;
        id=pId;
    }
    
    @Override
    public int hashCode() {
        int hash = 1;
        hash = 31 * hash + workspace.hashCode();
        hash = 31 * hash + id.hashCode();
        return hash;
    }
    
    @Override
    public boolean equals(Object pObj) {
        if (this == pObj) {
            return true;
        }
        if (!(pObj instanceof ConfigurationItemKey)) {
            return false;
        }
        ConfigurationItemKey key = (ConfigurationItemKey) pObj;
        return key.id.equals(id) && key.workspace.equals(workspace);
    }
    
    @Override
    public String toString() {
        return workspace + "-" + id;
    }
    
    public String getWorkspace() {
        return workspace;
    }
    
    public void setWorkspace(String pWorkspace) {
        workspace = pWorkspace;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}