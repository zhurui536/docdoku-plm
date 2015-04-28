package com.docdoku.server.rest.dto;/*
 * DocDoku, Professional Open Source
 * Copyright 2006 - 2015 DocDoku SARL
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

import java.util.List;
import java.util.Set;

/**
 * @author: Chadid Asmae
 */
public class PathDataIterationDTO {
    private int iteration;
    private String noteIteration;
    private PartMinimalListDTO partsPath;
    private List<String> attachedFiles;
    private Set<DocumentIterationDTO> linkedDocuments;
    private List<InstanceAttributeDTO> instanceAttributes;

    public int getIteration() {
        return iteration;
    }

    public void setIteration(int iteration) {
        this.iteration = iteration;
    }

    public String getNoteIteration() {
        return noteIteration;
    }

    public void setNoteIteration(String noteIteration) {
        this.noteIteration = noteIteration;
    }

    public PartMinimalListDTO getPartsPath() {
        return partsPath;
    }

    public void setPartsPath(PartMinimalListDTO partsPath) {
        this.partsPath = partsPath;
    }

    public List<String> getAttachedFiles() {
        return attachedFiles;
    }

    public void setAttachedFiles(List<String> attachedFiles) {
        this.attachedFiles = attachedFiles;
    }

    public Set<DocumentIterationDTO> getLinkedDocuments() {
        return linkedDocuments;
    }

    public void setLinkedDocuments(Set<DocumentIterationDTO> linkedDocuments) {
        this.linkedDocuments = linkedDocuments;
    }

    public List<InstanceAttributeDTO> getInstanceAttributes() {
        return instanceAttributes;
    }

    public void setInstanceAttributes(List<InstanceAttributeDTO> instanceAttributes) {
        this.instanceAttributes = instanceAttributes;
    }

}