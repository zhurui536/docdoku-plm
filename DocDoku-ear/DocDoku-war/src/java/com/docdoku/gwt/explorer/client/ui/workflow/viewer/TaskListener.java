/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.docdoku.gwt.explorer.client.ui.workflow.viewer;

import java.util.EventListener;

/**
 *
 * @author manu
 */
public interface TaskListener extends EventListener {

    void onTaskStatusChange(TaskChangeEvent ev);

}
